import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { format } from "date-fns";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const MakeAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const onSubmit = async (data) => {
        // image upload to imgbb
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
      
        const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

        console.log(res);

       
        const announcement = {
            image: res.data.data.display_url,
            authorName: user?.displayName || "Admin",
            authorImage: user?.photoURL || "default-avatar.png",
            authorEmail: user?.email,
            title: data.title,
            description: data.description,
            createdAt: currentDate,
        };


        const response = await axiosPublic.post("/announcements", announcement);
        if (response.data.insertedId) {
            Swal.fire("Success", "Announcement added successfully!", "success");
            queryClient.invalidateQueries(["announcements"]);
            reset();
        }
        console.log(announcement)
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold">Title</label>
                    <input {...register("title", { required: "Title is required" })} className="input input-bordered w-full" placeholder="Enter title" />
                   

                </div>
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea {...register("description", { required: "Description is required" })} className="textarea textarea-bordered w-full" placeholder="Enter description"></textarea>
                  
                </div>
                <div>
                    <label className="block font-semibold">Image</label>
                    <input type="file" {...register("image", { required: "Image is required" })} className="file-input file-input-bordered w-full" />
                 
                </div>
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
        </div>
    );
};
export default MakeAnnouncement;