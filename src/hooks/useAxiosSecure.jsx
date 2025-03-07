
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

// Create axios instance
export const axiosSecure = axios.create({
    baseURL: 'http://localhost:7000'
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();


    // jwt interceptor start here:
    // 1. request interceptors to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })


    // 2. intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor',status);
        // for 401 or 403 logout the use and move the user to the login page
        if (status === 401 || status === 403) {
            await signOutUser();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    // jwt interceptor end here

    return axiosSecure;
};

export default useAxiosSecure;




