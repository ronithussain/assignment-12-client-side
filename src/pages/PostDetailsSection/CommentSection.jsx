import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CommentSection = ({ postId, user }) => {
    const [newComment, setNewComment] = useState("");
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();


    const { data: commentsData = [], isLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments/${postId}`)
            console.log("Fetched Comments:", res.data);
            return res.data;
        }
    });
    const comments = commentsData?.result || [];
    console.log(postId)
    console.log(comments);


    const commentMutation = useMutation({
        mutationFn: async (commentText) => {
            const res = await axiosPublic.post("/comments", {
                postId,
                userEmail: user?.email,
                userName: user?.displayName,
                userImage: user?.photoURL,
                comment: commentText,
            });
            return res.data;
        },
        onSuccess: () => {
            console.log("Comment added successfully");
            queryClient.invalidateQueries(["comments", postId]); // Re-fetch comments
            setNewComment(""); // Clear input field
        },
    });

    //  Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;
        commentMutation.mutate(newComment);
    };
    console.log(newComment)

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    return (
        <div className="my-6">

            <h3 className="text-lg font-semibold mb-2">Comments: ( {comments?.length || 0} )</h3>

            {/* Comment Input Section */}
            {user ? (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 p-2 border-gray-300 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                        disabled={commentMutation.isLoading}
                    >
                        {commentMutation.isLoading ? "Posting..." : "Post"}
                    </button>
                </form>
            ) : (
                <p className="text-gray-500">Login to add a comment.</p>
            )}

            {/* Display Comments */}
            <div className="space-y-3 mt-2 sm:mt-4">
                {comments?.map((comment, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start bg-gray-100 dark:bg-gray-800 p-4 sm:p-5 rounded-lg shadow-md transition-all"
                    >
                        {/* Profile Image */}
                        <img
                            src={comment.userImage}
                            alt={comment.userName}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                        />

                        {/* Comment Content */}
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white">
                                {comment.userName}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                                {comment.comment}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-1 flex justify-end">
                                 {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CommentSection;
