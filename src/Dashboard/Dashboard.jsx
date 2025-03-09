import { FaHome, FaUtensils, FaBars, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { RxActivityLog } from "react-icons/rx";
import { TfiAnnouncement } from "react-icons/tfi";

const DashBoard = () => {
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar Toggle Button for Small Screens */}
            <button
                className="md:hidden p-4 text-2xl bg-orange-400 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <FaBars />
            </button>

            {/* Dashboard Sidebar */}
            <div className={`absolute md:relative z-10 min-h-screen bg-[#627288] w-80 transition-all duration-300 
                ${isSidebarOpen ? "block" : "hidden"} md:block`}
            >
                <ul className="menu w-full space-y-4 p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <FaHome className="text-xl" />
                                        ADMIN PROFILE
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageUsers"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <FaUsers className=" text-xl" />
                                        MANAGE USERS
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reportedActivities"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <RxActivityLog className=" text-xl" />
                                        REPORTED ACTIVITIES
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/makeAnnouncement"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <TfiAnnouncement className=" text-xl" />
                                        MAKE ANNOUNCEMENT
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/addPost"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <FaHome className="text-xl" />
                                        ADD POST
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myPost"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <FaUtensils className=" text-xl" />
                                        MY POST
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myProfile"
                                        className={({ isActive }) => isActive ? "text-white font-bold bg-[#344152] p-2 rounded-lg flex items-center gap-2" : "font-medium text-xs sm:text-xl flex items-center gap-2"}
                                    >
                                        <FaUtensils className=" text-xl" />
                                        MY PROFILE
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* Shared Nav Links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="font-medium text-xs sm:text-xl flex items-center gap-2">
                            <FaHome className="text-xl" />
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 sm:p-12 p-3">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
