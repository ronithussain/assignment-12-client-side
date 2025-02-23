import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    

    return (
        <div
            // style={{
            //     backgroundImage: `url(${errorImg})`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            //     backgroundRepeat: 'no-repeat',
            // }}
            className="min-h-screen flex justify-center items-center flex-col space-y-4">
            {/* Overlay with blur */}
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    filter: 'blur(200px)',
                    pointerEvents: 'none',
                }}
                className="absolute inset-0"
            >

            </div>
            <div id="error-page" className="text-gray-600 flex flex-col justify-center items-center ">
                <h1 className="font-bold text-3xl ">Oops!</h1>
                <p className="">Sorry, an unexpected error has occurred.</p>
                <p className=" font-semibold">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>

            <div className="flex justify-center items-center">
                <Link to='/' className="btn-neutral btn font-bold text-gray-500 ">Back To Home</Link>
            </div>
            <div>
                {/* <img className="w-18" src={errorIcon} alt="" /> */}
            </div>

        </div>
    );
}

export default ErrorPage;