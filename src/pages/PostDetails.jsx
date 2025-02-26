import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaWhatsapp, FaRegComment } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";

const PostDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const shareUrl = `https://yourdomain.com/post-details/${id}`;

  // Fetch Post Details
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/post-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !post) return <p className="text-center text-red-500">Something went wrong!</p>;

  const {
    postTitle, authorName, 
    postDescription, createdAt, authorImage, comments = [], tags = []
  } = post;

  // Comment Submission Mutation
  const commentMutation = useMutation({
    mutationFn: async (newComment) => {
      const res = await axiosPublic.post(`/post/${id}/comments`, newComment);
      return res.data;
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(["post", id]);
      const previousPost = queryClient.getQueryData(["post", id]);
      queryClient.setQueryData(["post", id], (oldData) => ({
        ...oldData,
        comments: [...(oldData?.comments || []), newComment],
      }));
      return { previousPost };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueryData(["post", id], context.previousPost);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // Handle Comment Submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();
    if (!commentText) return;

    const newComment = {
      comment: commentText,
      userId: "user123",
      userName: "John Doe",
      userImage: "https://via.placeholder.com/50",
      date: new Date().toLocaleString(),
    };

    commentMutation.mutate(newComment);
    e.target.reset();
  };

 

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-3">
        <img src={authorImage || "https://via.placeholder.com/50"} alt="Author" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{authorName || "Unknown Author"}</h2>
          <p className="text-gray-500 text-sm">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-4">{postTitle}</h1>
      <p className="text-gray-700 mt-2">{postDescription}</p>

      <div className="mt-2 flex gap-2">
        {tags.length > 0 ? tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded">#{tag}</span>
        )) : <span className="text-gray-500">No Tags</span>}
      </div>

      <div className="flex gap-4 mt-4">
        <button className="flex items-center gap-2 text-gray-600">
          <FaRegComment /> Comment
        </button>
        <FacebookShareButton url={shareUrl}><FaFacebook className="text-blue-600 text-xl" /></FacebookShareButton>
        <WhatsappShareButton url={shareUrl}><FaWhatsapp className="text-green-600 text-xl" /></WhatsappShareButton>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        {comments.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="p-3 border rounded-lg">
                <div className="flex gap-2 items-center">
                  <img src={comment.userImage || "https://via.placeholder.com/50"} alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold">{comment.userName || "Anonymous"}</p>
                    <p className="text-gray-600 text-sm">{comment.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <input type="text" name="comment" placeholder="Write a comment..." className="w-full px-3 py-2 border rounded-lg" />
          <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
