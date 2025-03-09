import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddTag from "./AddTag";

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();

    const { data: adminData = [], isLoading, } = useQuery({
        queryKey: ['adminProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-profile')
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center">Loading...</div>;

    const { name, email, image, totalPosts, totalUsers } = adminData;

    return (
        <>
            <div className="max-w-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
                {/* Profile Information */}
                <div className="flex flex-col items-center  pb-6 mb-6">
                    <img src={image} alt={name} className="w-32 h-32 rounded-full border-4 border-gray-300" />
                    <h2 className="text-3xl font-bold mt-4 text-gray-800">{name}</h2>
                    <p className="text-lg text-gray-600">{email}</p>
                </div>
                <div className="divider"></div>

                {/* Site Statistics */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Site Statistics:</h3>
                    <ul className="space-y-2">
                        <li className="text-gray-700">Total Posts: <span className="font-semibold">{totalPosts}</span></li>
                        <li className="text-gray-700">Total Users: <span className="font-semibold">{totalUsers}</span></li>
                    </ul>
                </div>

                {/* Add Tag Section */}
                <div className="mt-6">
                    <AddTag />
                </div>
            </div>
        </>
    );
};

export default AdminProfile;
