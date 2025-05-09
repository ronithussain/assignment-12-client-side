import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";



const Login = () => {
    const [showsPassword, setShowsPassword] = useState(false);
    const { handleLoginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log('in the location login page', location.state)


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        handleLoginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successful.css",
                    showclassName: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideclassName: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Login Error:", error.message); 
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 ">
                <div className="lg:mt-[205px] mt-[105px] w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <SocialLogin></SocialLogin>
                    <div className="divider mt-10">or</div>

                    {/* Login Form */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                name='email'
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block font-medium">Password</label>
                            <input
                                type={showsPassword ? "text" : "password"}
                                name='password'
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowsPassword(!showsPassword)}
                                className="absolute top-10 right-4 text-gray-500"
                            >
                                {showsPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                        {/* Login Button */}
                        {/* TODO: apply disabled for re-captcha */}
                        <input
                            disabled={false}
                            type="submit" value='Login' className='btn btn-primary w-full' />



                        {/* Register Link */}
                        <p className="text-center text-gray-600 mt-4">
                            You have no account? <Link className="text-blue-600" to="/register">Register now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
