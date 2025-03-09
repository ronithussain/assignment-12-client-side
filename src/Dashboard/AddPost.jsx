import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPost = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [postCount, setPostCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.email){
            axiosPublic.get(`postCount/${user.email}`)
            .then(res => {
                setPostCount(res.data.count)
                console.log(res.data.count)
            })
        }
    } ,[user, axiosPublic])
    console.log(postCount)

    const tagOptions = [
        { value: "technology", label: "Technology" },
        { value: "lifestyle", label: "Lifestyle" },
        { value: "education", label: "Education" },
        { value: "health", label: "Health" },
        { value: "entertainment", label: "Entertainment" }
    ];

    // Form Submission Handler
    const onSubmit = async (data) => {

        // image upload to imgbb and then get an url
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const postData = {
                image: res.data.data.display_url,
                authorName: user?.displayName,
                authorEmail: user?.email,
                authorImage: user?.photoURL,
                postTitle: data.postTitle,
                postDescription: data.postDescription,
                tag: data.tag?.value || "",
                upVote: 0,
                downVote: 0,
                createdAt: new Date().toISOString(),
            };
            //
            console.log(postData);
            const postResponse = await axiosPublic.post('/addItems', postData);
            console.log(postResponse.data)
            if (postResponse.data.insertedId) {
                // show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your post added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto sm:p-6 p-3 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Add a New Post</h2>

            {postCount >= 5 ? (
                <div className="text-center">
                    <p className="text-red-500 font-semibold mb-4">
                        You have reached the post limit! Become a member to add more posts.
                    </p>
                    <button
                        onClick={() => navigate("/membership")}
                        className="btn btn-primary text-lg"
                    >
                        Become a Member
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2">Post Title</label>
                        <input {...register("postTitle", { required: "Title is required" })} className="input input-bordered w-full" placeholder="Enter post title" />
                        {errors.postTitle && <p className="text-red-500 text-sm">{errors.postTitle.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Author Image</label>
                        <input type="file" {...register("image")} className="file-input file-input-bordered w-full" />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Post Description</label>
                        <textarea {...register("postDescription", { required: "Description is required" })} className="textarea textarea-bordered w-full" placeholder="Enter post description"></textarea>
                        {errors.postDescription && <p className="text-red-500 text-sm">{errors.postDescription.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Tag</label>
                        <Controller name="tag" control={control} rules={{ required: "Tag is required" }} render={({ field }) => (
                            <Select {...field} options={tagOptions} isClearable className="w-full" />
                        )} />
                        {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}
                    </div>

                    <input type="hidden" {...register("upVote")} value={0} />
                    <input type="hidden" {...register("downVote")} value={0} />

                    <button type="submit" className="btn btn-primary w-full p-3 text-lg font-semibold">Add Post</button>
                </form>
            )}
        </div>
    );
};

export default AddPost;
