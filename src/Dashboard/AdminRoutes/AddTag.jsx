import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddTag = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const { data: fetchedTags = [], refetch } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        const res = await axiosSecure.post("/add-tag", data);

        if (res.data.success) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Tag added successfully",
                confirmButtonColor: "#3085d6",
            });
            reset();
            await refetch();
            console.log("refetch called"); // kno jani refetch ta kaj kore na!
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Add Tags</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <input
                    type="text"
                    {...register("tag", { required: true })}
                    className="border-gray-200 p-2 rounded w-full bg-gradient-to-r from-slate-300 to-slate-100"
                    placeholder="Enter a tag..."
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add
                </button>
            </form>
            <div>
                <h3 className="text-lg font-semibold mt-4">Available Tags</h3>
                <ul>
                    {fetchedTags.map((tag, index) => (
                        <li key={index} className="bg-gradient-to-r from-slate-300 to-slate-100 p-2 rounded mt-1">
                            {tag.tag}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddTag;
