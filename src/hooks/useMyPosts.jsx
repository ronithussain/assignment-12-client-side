import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyPosts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

   
    const { refetch, data: myPost = [] } = useQuery({
        queryKey: ['myPosts', user?.email], 
       
        queryFn: async () => {
            const res = await axiosSecure.get(`/myPosts?email=${user?.email}`);
            return res.data;
        }
    });
console.log(myPost);
    return [myPost, refetch];
};

export default useMyPosts;
