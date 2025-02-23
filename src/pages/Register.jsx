import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showsPassword, setShowsPassword] = useState(false);
    const { handleLoginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/';

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = ({ email, password }) => {
        handleLoginUser(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    title: "User Login Successful!",
                    icon: "success",
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed!",
                    text: error.message,
                    icon: "error",
                });
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="lg:mt-[205px] mt-[105px] w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                
                <SocialLogin />

                <div className="divider mt-10">or</div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block font-medium">Password</label>
                        <input
                            type={showsPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
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
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Login Button */}
                    <input type="submit" value="Login" className="btn btn-primary w-full" />

                    {/* Register Link */}
                    <p className="text-center text-gray-600 mt-4">
                        You have no account? <Link className="text-blue-600" to="/register">Register now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
