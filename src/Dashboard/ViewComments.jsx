import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { FaFlag } from "react-icons/fa";
// import Swal from "sweetalert2";
import { axiosSecure } from "../hooks/useAxiosSecure";

// const feedbackOptions = ["Inappropriate", "Spam", "Offensive Language"];

const ViewComments = () => {
    const {id} = useParams();
    console.log(id);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/comments/${id}`)
            .then(res => setComments(res.data))
            .catch(error => console.error(error));
    }, [id]);
    console.log("Comments:", comments);
    console.log("Comments:", JSON.stringify(comments, null, 2));
    // const handleReport = (commentId) => {
    //     axiosSecure.post(`/reportComment/${commentId}`)
    //         .then(res => {
    //             if (res.data.success) {
    //                 setComments(comments.map(comment => 
    //                     comment._id === commentId ? { ...comment, reported: true } : comment
    //                 ));
    //                 Swal.fire("Reported!", "The comment has been reported.", "success");
    //             }
    //         });
    // };

    return (
        <div className="p-6 bg-base-300">
            <h2 className="text-2xl font-bold mb-4">Comments on Post</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Email</th>
                        <th>Comment</th>
                        <th>Feedback</th>
                        <th>Report</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(comments) && comments.length > 0 ? (
    comments.map((comment, index) => (
        <div key={index}>
            <p>{comment.text}</p>
            <p>By: {comment.author}</p>
        </div>
    ))
) : (
    <p>No comments available</p>
)}

                    {/* {comments?.map(comment => (
                        <tr key={comment._id} className="border-t">
                            <td>{comment.email}</td>
                            <td>
                                {comment.text.length > 20 ? (
                                    <>
                                        {comment.text.slice(0, 20)}... 
                                        <button 
                                            className="text-blue-500"
                                            onClick={() => Swal.fire("Full Comment", comment.text, "info")}
                                        >
                                            Read More
                                        </button>
                                    </>
                                ) : comment.text}
                            </td>
                            <td>
                                <select 
                                    className="border p-1"
                                    onChange={(e) => setComments(comments.map(c => 
                                        c._id === comment._id ? { ...c, feedback: e.target.value } : c
                                    ))}
                                >
                                    <option value="">Select Feedback</option>
                                    {feedbackOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleReport(comment._id)}
                                    disabled={!comment.feedback || comment.reported}
                                    className={`btn ${comment.reported ? "btn-disabled" : "btn-warning"}`}
                                >
                                    <FaFlag /> Report
                                </button>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default ViewComments;
