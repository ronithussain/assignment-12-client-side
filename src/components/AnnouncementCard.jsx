import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaThumbsUp, FaThumbsDown, FaUserCircle, FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const AnnouncementCard = ({ announcement }) => {
    const { user } = useAuth();
    const {
        _id, postTitle, authorName, image, authorEmail,
        postDescription, upVote, downVote, upVoters, downVoters, createdAt, authorImage
    } = announcement;

    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();

    // Like Mutation
    const likeMutation = useMutation({
        mutationFn: async () => axiosPublic.patch(`/posts/like/${_id}`, { userEmail: user?.email }),
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });

    // Dislike Mutation
    const dislikeMutation = useMutation({
        mutationFn: async () => axiosPublic.patch(`/posts/dislike/${_id}`, { userEmail: user?.email }),
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });

    return (
        <div className="bordersB position p-4 rounded-lg shadow-md bg-white my-6">
            {/* Author Section */}
            <div className="flex items-center gap-3 mb-2">
                {image ? (
                    <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full" />
                ) : (
                    <FaUserCircle className="text-gray-500 text-3xl" />
                )}
                <div>

                    <h4 className="text-md font-semibold">{authorName}</h4>
                    <p className="text-xs text-gray-500">{authorEmail}</p>
                </div>
            </div>

            {/* Post Title */}
            <h2 className="text-lg font-semibold mt-2">{postTitle}</h2>

            {/* Post Description */}
            <p className="text-gray-600 my-2 text-justify">{postDescription}</p>
            {image && (
                <img
                    src={image}
                    alt="Post Image"
                    className="w-full h-auto max-h-[500px] object-cover rounded-md"
                />
            )}
            <div className="divider"></div>
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                <div className="flex sm:gap-x-3">
                    <button
                        onClick={() => likeMutation.mutate()}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all 
                        ${upVoters?.includes(user?.email) ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={likeMutation.isLoading || downVoters?.includes(user?.email)}
                    >
                        <FaThumbsUp className="text-lg" /> {upVote}
                    </button>

                    <button
                        onClick={() => dislikeMutation.mutate()}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all 
                        ${downVoters?.includes(user?.email) ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={dislikeMutation.isLoading || upVoters?.includes(user?.email)}
                    >
                        <FaThumbsDown className="text-lg" /> {downVote}
                    </button>
                </div>
                <p className="text-gray-500 text-sm">
                    {createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "Just now"}
                </p>
            </div>
            <div className="flex justify-center">
                <Link
                    to={`/post-details/${_id}`}
                    className="px-6 py-3 text-gray-700 rounded-lg hover:text-blue-600 transition flex items-center gap-2 text-lg font-medium sm:text-base sm:px-4 sm:py-2"
                >
                    View Post Details{" "}
                    <FaArrowRight className="text-gray-500 group-hover:text-blue-600 transition-transform transform group-hover:translate-x-1 duration-300" />
                </Link>
            </div>

        </div>
    );
};

export default AnnouncementCard;
