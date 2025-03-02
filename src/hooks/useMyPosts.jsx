// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useMyPosts = () => {
//     const axiosSecure = useAxiosSecure(); // axiosSecure hooks ke niye asa holo
//     const {user} = useAuth(); // every user wise show post in the ui

//     const {refetch, data: myPosts = [] } = useQuery({
//         queryKey: ['myPosts', user?.email], // user onujayi cart show korbe tai query key te user.email diye user k set kora holo
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/myPosts?email=${user?.email}`)
//             return res.data;
//         }
//     })
//     console.log(user, myPosts)
//     return [myPosts, refetch] // refetch ke pathanor jonnoi array akare reture kora hoyeche etai reason
// };

// export default useMyPosts;

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyPosts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // user?.email না থাকলে API কল হবে না
    const { refetch, data: myPost = [] } = useQuery({
        queryKey: ['myPosts', user?.email], 
        enabled: !!user?.email, // user.email থাকলে API কল হবে
        queryFn: async () => {
            const res = await axiosSecure.get(`/myPosts?email=${user?.email}`);
            return res.data;
        }
    });
console.log(myPost);
    return [myPost, refetch];
};

export default useMyPosts;
