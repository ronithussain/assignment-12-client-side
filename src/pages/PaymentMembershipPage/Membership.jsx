// import { useNavigate } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";




//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Membership = () => {
    // const navigate = useNavigate();

    return (
        <>
            <div className="mt-96">
                <div className='mx-auto text-center my-12 md:w-4/12'>
                    <p className='text-yellow-600 mb-1'>---Payment Gateway---</p>
                    <h3 className='lg:text-4xl md:text-3xl uppercase border-y-4 py-4'>Payment Gateway</h3>
                </div>
                <div className="container mx-auto">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm amount={20} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Membership;
