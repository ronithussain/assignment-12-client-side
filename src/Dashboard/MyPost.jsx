import Swal from "sweetalert2";
import { axiosSecure } from "../hooks/useAxiosSecure";
import useMyPosts from "../hooks/useMyPosts";
import { FaComments, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";


const MyPost = () => {
    const [myPost, refetch] = useMyPosts();
    console.log(myPost);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/myPosts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); 
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div className="bg-base-300 px-6 py-6">
            {/* <SectionTitle subHeading="My Cart" heading="wanna add more?"></SectionTitle> */}
            <div className="flex justify-between items-center md:flex-wrap">
                <h2 className="text-4xl md:text-3xl">Total my posts: {myPost.length}</h2>


            </div>
            <div>
                <div className="overflow-x-auto mt-8 w-full">
                    <table className="table ">
                        {/* head */}
                        <thead className="bg-[#1D84B5] text-white/80">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Item Image</th>
                                <th>Post Title</th>
                                <th>Total Votes</th>
                                <th>Comments</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                myPost.map((post, index) => 
                                <tr key={post._id} className="hover:bg-gray-50">
                                    <th className="text-[#1D84B5]">
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={post.authorImage}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {post.postTitle}
                                    </td>
                                    <td>{post.upVote}</td>
                                    <td>
                                        <Link to={`/dashboard/comments/${post._id}`} className="btn btn-primary">
                                        <FaComments/>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="btn btn-ghost text-lg bg-[#EF433F] text-white"><FaTrash></FaTrash> </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPost;