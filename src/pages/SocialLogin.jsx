
// import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";




const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    // const axiosPublic = useAxiosPublic();


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate('/');
                // //------------------------------------
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user?.displayName
                // }
                // axiosPublic.post('/users', userInfo)
                // .then(res => {
                //     console.log(res.data);
                //     navigate('/');
                // })
                // //------------------------------------
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <>
            <div className="flex justify-center items-center mb-4">

                <button
                    onClick={handleGoogleLogin}
                    className="btn w-full flex items-center justify-center gap-2 px-4 py-2 rounded transition "
                >
                     Sign in with Google
                </button>
            </div>
        </>
    );
};

export default SocialLogin;