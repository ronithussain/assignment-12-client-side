import axios from "axios";


export const axiosSecure = axios
    .create({
        baseURL: 'https://y-navy-chi.vercel.app'
    })

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;