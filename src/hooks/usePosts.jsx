import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useState } from "react";

const usePosts = () => {
    const axiosPublic = useAxiosPublic();
    const [sortBy, setSortBy] = useState("newest");
    
    
    const { data: posts = [], isLoading, error, refetch } = useQuery({
        queryKey: ["posts", sortBy],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?sortBy=${sortBy}`);
            return res.data;
        }
    });
    const updateSort = (newSort) => {
        setSortBy(newSort); 
        refetch();
    };

    return [posts, isLoading, error,  updateSort, sortBy];
};

export default usePosts;
