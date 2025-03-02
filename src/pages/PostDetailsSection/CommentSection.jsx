import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CommentSection = ({ postId, comments, refetch }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [newComment, setNewComment] = useState("");

    // Comment Mutation with refetch
    const commentMutation = useMutation({
        mutationFn: async (commentText) => {
            const res = await axiosPublic.post(`/post/comment/${postId}`, {
                userId: user?.uid,
                userName: user?.displayName,
                userImage: user?.photoURL,
                comment: commentText,
            });
            return res.data;
        },
        onSuccess: () => {
            refetch(); // Fetch updated comments
            setNewComment(""); // Clear input field
        },
        onError: (error) => {
            console.error("Failed to add comment:", error);
        }
    });

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Comments: ({comments?.length || 0})</h3>

            {/* Comment Input Section */}
            {user ? (
                <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-3 py-2 flex-grow w-full sm:w-auto"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        onClick={() => commentMutation.mutate(newComment)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
                        disabled={!newComment.trim() || commentMutation.isLoading}
                    >
                        {commentMutation.isLoading ? "Posting..." : "Comment"}
                    </button>
                </div>
            ) : (
                <p className="text-red-500">Please log in to comment.</p>
            )}

            {/* Display Comments */}
            <div className="space-y-3">
                {comments?.map((comment, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 items-start bg-gray-100 p-3 rounded-lg">
                        <img
                            src={comment.userImage}
                            alt={comment.userName}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        />
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm sm:text-base">{comment.userName}</h4>
                            <p className="text-gray-700 text-sm sm:text-base">{comment.comment}</p>
                            <p className="text-gray-500 text-xs sm:text-sm">
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
