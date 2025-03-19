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

    // Fetch Post Details
    const { data: post, isLoading, isError, } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/post-details/${id}`);
            return res.data;
        },
    });

    // Like Mutation
    const likeMutation = useMutation({
        mutationFn: async () => axiosPublic.patch(`/posts/like/${id}`, { userEmail: user?.email }),
        onSuccess: () => queryClient.invalidateQueries(["post", id]),
    });

    // Dislike Mutation
    const dislikeMutation = useMutation({
        mutationFn: async () => axiosPublic.patch(`/posts/dislike/${id}`, { userEmail: user?.email }),
        onSuccess: () => queryClient.invalidateQueries(["post", id]),
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError || !post) return <p className="text-center text-red-500">Something went wrong!</p>;

    return (
        <div className="max-w-5xl mx-auto sm:p-6 p-2 bg-white shadow-lg rounded-lg my-6">
            {/* Author Info */}
            <div className="flex items-center gap-3">
                <img src={post?.authorImage} alt="Author" className="w-12 h-12 rounded-full border-2 border-gray-300" />
                <div>
                    <h2 className="text-lg font-semibold">{post?.authorName}</h2>
                    <p className="text-gray-500 text-sm">
                        {post?.createdAt ? formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true }) : "Just now"}
                    </p>
                </div>
            </div>

            {/* Post Content */}
            <h1 className="text-3xl font-bold mt-5">{post?.postTitle}</h1>
            <p className="text-gray-700 mt-3 leading-relaxed">{post?.postDescription}</p>

            {/* Post image */}
            {post?.image && (
                <img
                    src={post.image}
                    alt="Post Image"
                    className="w-full mt-1 h-auto max-h-[500px] object-cover rounded-md"
                />
            )}

            {/* Tags Section */}
            {post?.tag && (
                <div className="mt-3">
                    <span className="text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">{post.tag}</span>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
                {/* Like & Dislike Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => likeMutation.mutate()}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 
                                    ${post?.upVoters?.includes(user?.email) ? "bg-green-200 text-green-700" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={likeMutation.isLoading || post?.downVoters?.includes(user?.email)}
                    >
                        <FaThumbsUp className="text-xl" /> {post?.upVote}
                    </button>

                    <button
                        onClick={() => dislikeMutation.mutate()}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 
                                    ${post?.downVoters?.includes(user?.email) ? "bg-red-200 text-red-700" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={dislikeMutation.isLoading || post?.upVoters?.includes(user?.email)}
                    >
                        <FaThumbsDown className="text-xl" /> {post?.downVote}
                    </button>
                </div>

                {/* Share Button */}
                <ShareButton postId={post._id} title={post.postTitle} />
            </div>

            {/* Comment Section */}
            <CommentSection postId={post._id} user={user} />
        </div>
    );
};

export default PostDetails;
