import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaBell, FaSearch } from "react-icons/fa";
import logoImg from '../assets/logo/connection-vector-logo-template.png';
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("");

    // Fetch Announcements
    const { data: announcements = [] } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosPublic.get("/announcements");
            return res.data; // Assuming this returns an array
        }
    });

    const handleLogout = () => {
        signOutUser()
            .then(result => { console.log(result) })
            .catch(error => console.log(error.message))
    };

    const navOptions = <>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/memberShip">MEMBERSHIP</Link></li>
    </>;

    return (
        <>
            <div className="fixed top-0 z-50 text-white bg-opacity-80 backdrop-blur-md bg-black/20 navbar sm:px-4 px-1 w-[100%]">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden sm:block">
                            <img src={logoImg} alt="Logo" className="w-18 h-18" />
                        </div>
                        <Link to="/" className="hidden sm:block sm:text-3xl text-xl font-medium">Talk<span className="text-red-500 text-4xl">S</span>phere</Link>
                    </div>
                </div>

                {/* Search bar */}
                <div className="relative w-full md:w-80 lg:w-96  mr-6 sm:mr-0">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-800/50 backdrop-blur-xl input sm:w-full pl-12 pr-4 sm:py-6 py-1 rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:border-blue-500 shadow-lg transition duration-300 ease-in-out text-white placeholder-gray-400 sm:text-base text-sm"
                    />
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400 w-4 h-4 sm:w-6 sm:h-6 " />
                    </div>
                </div>


                <div className="navbar-end flex">
                    {/* Notification Bell */}
                    <div className="relative mr-4">
                        <li className="relative list-none">
                            <FaBell className="text-xs sm:text-xl cursor-pointer text-gray-300 hover:text-yellow-400 transition duration-300 transform hover:scale-110" />

                            {announcements.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                                    {announcements.length}
                                </span>
                            )}
                        </li>
                    </div>


                    {/* Desktop Menu */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>

                    {/* User Profile */}
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="avatar cursor-pointer">
                                    <img src={user.photoURL} alt="Profile" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full p-1 bg-gray-700 object-cover" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu shadow bg-gray-900/80 rounded-box w-40 mt-2 ">
                                    <li className="font-bold text-center">{user.displayName}</li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
                                </ul>
                            </div>
                            :
                            <li><Link to="/login">Login</Link></li>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;
