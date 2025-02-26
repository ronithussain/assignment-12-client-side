import { useNavigate } from "react-router-dom";

const Membership = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center max-w-md mx-auto  pt-44 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Upgrade Your Membership</h2>
            <p className="mb-4">Become a premium member to add unlimited posts.</p>
            <button
                onClick={() => navigate("/checkout")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Upgrade Now
            </button>
        </div>
    );
};

export default Membership;
