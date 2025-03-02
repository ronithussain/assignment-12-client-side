import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ShareButton from "./ShareButton";
import CommentSection from "./CommentSection";



const PostDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    // const shareUrl = `${window.location.origin}/post/${id}`;


    // Fetch Post Details
    const { data: post, isLoading, isError, refetch} = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/post-details/${id}`);
            return res.data;
        },
    });


    // Like Mutation
    const likeMutation = useMutation({
        mutationFn: async () => axiosPublic.patch(`/posts/like/${id}`, { userEmail: user?.email }),
        onSuccess: () => queryClient.invalidateQueries(["posts", id]),
    });

    // Dislike Mutation
    const dislikeMutation = useMutation({
        mutationFn: async () => axiosPublic.patch(`/posts/dislike/${id}`, { userEmail: user?.email }),
        onSuccess: () => queryClient.invalidateQueries(["posts", id]),
    });

  

    if (isLoading) return <LoadingSpinner />;
    if (isError || !post) return <p className="text-center text-red-500">Something went wrong!</p>;



    console.log("Requested Post ID:", id);


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-44">
            <div className="flex items-center gap-3">
                <img src={post?.authorImage} alt="Author" className="w-12 h-12 rounded-full" />
                <div>
                    <h2 className="text-lg font-semibold">{post?.authorName}</h2>
                    <p className="text-gray-500 text-sm">
                        {post?.createdAt ? formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true }) : "Just now"}
                    </p>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-4">{post?.postTitle}</h1>
            <p className="text-gray-700 mt-2">{post?.postDescription}</p>

            <div className="mt-2 flex gap-2">
                <p>{post?.tag}</p>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-3">
                <div className="flex sm:gap-x-3">
                    <button
                        onClick={() => likeMutation.mutate()}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all 
                                    ${post?.upVoters?.includes(user?.email) ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={likeMutation.isLoading || post?.downVoters?.includes(user?.email)}
                    >
                        <FaThumbsUp className="text-lg" /> {post?.upVote}
                    </button>

                    <button
                        onClick={() => dislikeMutation.mutate()}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all 
                                    ${post?.downVoters?.includes(user?.email) ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={dislikeMutation.isLoading || post?.upVoters?.includes(user?.email)}
                    >
                        <FaThumbsDown className="text-lg" /> {post?.downVote}
                    </button>
                </div>
                <div className="mt-4">
                <ShareButton postId={post._id} title={post.title} />
                </div>
            </div>
            {/* Comment Section */}
            <CommentSection postId={id} comments={post?.comments} refetch={refetch} />
           
        </div>
    );
};

export default PostDetails;
