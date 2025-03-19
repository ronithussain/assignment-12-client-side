import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";
import Modal from "react-modal";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
Modal.setAppElement("#root");

const ViewComments = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [showModalComment, setShowModalComment] = useState(null);
    const [feedbacks, setFeedbacks] = useState({});
    const [reportedComments, setReportedComments] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [commentsWithReportStatus, setCommentsWithReportStatus] = useState([]);

    // Handle feedback change
    const handleFeedbackChange = (e, commentId) => {
        const feedback = e.target.value;
        setFeedbacks(prevFeedbacks => ({
            ...prevFeedbacks,
            [commentId]: feedback
        }));
    };

    // Handle report button click
    const handleReportClick = async (commentId) => {
        const selectedFeedback = feedbacks[commentId]; // Get the feedback for the specific comment
        if (selectedFeedback) { //jodi feedback select kore taholey se report korte parbe!
            try {
                await axiosSecure.post('/report', { commentId, feedback: selectedFeedback });

                // Update report status for that specific comment
                setReportedComments((prev) => ({
                    ...prev,
                    [commentId]: true
                }));

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Reported Successfully',
                    text: 'Thank you for your feedback. The comment has been reported.',
                    confirmButtonText: 'Okay',
                });
            } catch (error) {
                console.error("Error reporting comment", error);
            }
        }
    };

    const { data: comments = [], error, isLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            const commentsWithStatus = res.data.map(comment => ({
                ...comment,
                reportStatus: false
            }));
            setCommentsWithReportStatus(commentsWithStatus);
            return res.data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-2xl text-red-600">Error fetching comments!</div>;
    }

    return (
        <>
            <div className="w-[100%] mx-auto sm:py-6 py-1 sm:px-4  lg:px-8">
                <h2 className="lg:text-2xl md:text-xl text-xs font-semibold text-gray-800 mb-4">
                    View Comments for Post ID: {postId}
                </h2>

                {comments?.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                        <table className="min-w-full bg-white table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Comment</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Feedback</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment) => (
                                    <tr key={comment._id} className="hover:bg-gray-50">
                                        {/* Email */}
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{comment.userEmail}</td>

                                        {/* Comment */}
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {/* comment er length jodi 20 character er besi hoy tahole button ta dekhabe, jodi na hoy tahole comment.comment dekhabe: */}
                                            {comment.comment.length > 20 ? (
                                                <>
                                                    {comment.comment.substring(0, 20)}...
                                                    <button
                                                        onClick={() => setShowModalComment(comment.comment)}
                                                        className="text-blue-600 ml-2 hover:underline"
                                                    >
                                                        Read More
                                                    </button>
                                                </>
                                            ) : comment.comment}
                                        </td>

                                        {/* Feedback Dropdown chatGPT help niye korsi but puropuri bujhi nai. */}
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <select
                                                className="border border-gray-300 rounded-md py-1 px-2"
                                                value={feedbacks[comment._id] || ""}
                                                onChange={(e) => handleFeedbackChange(e, comment._id)}
                                            >
                                                <option value="">Select options</option>
                                                <option value="Offensive">Offensive</option>
                                                <option value="Inappropriate">Inappropriate</option>
                                                <option value="Spam">Spam</option>
                                            </select>
                                        </td>

                                        {/* Report Button chatGPT help niye korsi but puropuri bujhi nai.*/}
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            <button
                                                onClick={() => handleReportClick(comment._id)}
                                                disabled={!feedbacks[comment._id] || reportedComments[comment._id]}
                                                className={`px-4 py-2 rounded transition 
                                                    ${reportedComments[comment._id]
                                                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                                        : feedbacks[comment._id]
                                                            ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`
                                                }
                                            >
                                                {reportedComments[comment._id] ? 'Reported' : 'Report'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal */}
                <Modal
                    isOpen={!!showModalComment}
                    onRequestClose={() => setShowModalComment(null)}
                    contentLabel="Full Comment"
                    className="relative bg-white/80 backdrop-blur-xl p-6 rounded-lg shadow-2xl max-w-lg w-full mx-auto transition-all duration-300"
                    overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center px-4"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setShowModalComment(null)}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
                    >
                        <RxCross2 className="lg:text-2xl md:text-xl text-xs"></RxCross2>
                    </button>

                    {/* Modal Content */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        Full Comment
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">{showModalComment}</p>
                </Modal>
            </div>
        </>
    );
};

export default ViewComments;
