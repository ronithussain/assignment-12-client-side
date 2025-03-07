import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaUsers } from "react-icons/fa";
import { useState } from "react";



const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');


    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    });
    console.log(users)

    const handleMakeAdmin = id => {
        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'He is an Admin Now!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleMakeSubscription = id => {
        axiosSecure.patch(`/users/subscription/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'He is an Membership Now!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = user => {
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Users has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };
    return (
        <div>
            <h3 className='text-3xl'>Total Users: {users.length}</h3>

            <div>
                <div className="overflow-x-auto mt-8 w-full">
                    <input
                        type="text"
                        placeholder=" Search by name..."
                        className="border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 outline-none p-2 rounded-md w-[100%]  mx-auto block text-lg shadow-sm transition-all duration-300 mb-4"
                        onChange={(e) => setSearch(e.target.value)}
                    />


                    <table className="table ">
                        {/* head */}
                        <thead className="bg-orange-300 border-4 border-orange-400">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>User Profile</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Admin</th>
                                <th>Subscription Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
                                                    // alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {
                                            user.role === 'admin' ?
                                                <span className="text-green-500 font-medium sm:text-base text-xs ">Admin</span>
                                                :
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className="btn btn-ghost text-lg bg-orange-400 text-white">
                                                    <FaUsers />
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        {
                                            user.subscription === 'subscription' ?
                                                <span className="text-green-500 font-medium sm:text-base text-xs ">Premium</span>
                                                :
                                                <button
                                                    onClick={() => handleMakeSubscription(user._id)}
                                                    className="btn btn-ghost text-lg bg-orange-400 text-white">
                                                    Free
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-ghost text-lg bg-orange-400 text-white">
                                            <FaTrash></FaTrash>
                                        </button>
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

export default ManageUsers;