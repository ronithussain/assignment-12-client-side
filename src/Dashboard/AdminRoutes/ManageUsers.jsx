import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaUsers } from "react-icons/fa";
import { useState } from "react";
import ReactPaginate from "react-paginate";



const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;


    const { data: usersData = [], refetch } = useQuery({
        queryKey: ["users", search, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}&page=${currentPage}&limit=${usersPerPage}`);
            return res.data;
        }
    });
    console.log(usersData)

    const users = usersData?.result || [];
    const totalPages = usersData?.totalPages || 1;
    console.log(users, 'all data to users ')

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
        refetch();
    };

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
    console.log("Users Data:", usersData);
    console.log("Users Array:", users);

    return (
        <div>
            <h3 className='text-3xl'>Total Users: {users.length}</h3>

            <div>
                {/* search input */}
                <div className="overflow-x-auto mt-8 w-full">
                    <input
                        type="text"
                        placeholder=" Search by name..."
                        className="border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 outline-none p-2 rounded-md w-[100%]  mx-auto block text-lg shadow-sm transition-all duration-300 mb-4"
                        onChange={(e) => setSearch(e.target.value)}
                    />


                    <table className="table ">
                        {/* head */}
                        <thead className="bg-[#1D84B5] text-white/80">
                            <tr >
                                <th>
                                    #
                                </th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Admin</th>
                                <th>Subscription Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => 
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <th className="text-[#1D84B5]">
                                        {index + 1 + currentPage * usersPerPage}
                                    </th>
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
                                                    className="btn btn-ghost text-lg bg-[#33B3CA] text-white">
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
                                                    className="btn btn-ghost text-lg bg-[#33B3CA] text-white">
                                                    Free
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="btn btn-ghost text-lg bg-[#EF433F] text-white">
                                            <FaTrash></FaTrash>
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-end mt-4">
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    containerClassName={"flex gap-3"}
                    pageClassName={"px-3 py-1  rounded-md cursor-pointer"}
                    activeClassName={"bg-[#EF433F] text-white"}
                    previousClassName={"px-3 py-1 rounded-md cursor-pointer"}
                    nextClassName={"px-3 py-1  rounded-md cursor-pointer"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                />
            </div>
        </div>
    );
};

export default ManageUsers;