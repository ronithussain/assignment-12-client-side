import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#ff5733" size={80} />
            </div>
        </div>
    );
};

export default LoadingSpinner;