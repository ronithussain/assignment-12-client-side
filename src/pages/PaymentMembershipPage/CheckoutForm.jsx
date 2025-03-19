import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const CheckoutForm = ({amount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');

    const axiosSecure = useAxiosSecure();


    const [clientSecret, setClientSecret] = useState('');
    useEffect(()=> {
        axiosSecure.post('/create-payment-intent', {amount})
        .then(res => setClientSecret(res.data.clientSecret))
    } ,[amount, axiosSecure])
    console.log(clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) { // jodi stripe || elements na thake tahole ami payment korbo kivabe???
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) { // jodi card ta !card || null mane negative hoy tahole payment korte dibe na.
            return;
        }// ei porjonto krar por publishable key er kaj ta korte hobe, means strip e ekta account create korte hobe

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if(error){
            console.log('payment error', error)
            setError(error.message); // jodi error hoy tahole error state e save thakbe and ui te dekhabe
        }else{
            console.log('payment method', paymentMethod)
            setError(''); // jodi card information thik thake tahole error ta clear hoye jabe.
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '24px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-lg btn-primary mt-2 px-12" type="submit" disabled={!stripe}>
                Pay
            </button>
            <p className="text-red-600 mt-1">{error}</p>
        </form>
    );
};

export default CheckoutForm;