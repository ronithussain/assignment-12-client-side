import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaBell, FaSearch } from "react-icons/fa";
import logoImg from '../assets/logo/connection-vector-logo-template.png';
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const axiosPublic = useAxiosPublic();

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
            <div className="fixed z-50 text-white bg-opacity-80 backdrop-blur-md bg-black/20 navbar sm:px-4 px-1 w-full">
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
                <div className="relative w-[100%] mr-4 sm:mr-0">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-800/50 backdrop-blur-2xl input input-md w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-gray-800 focus:border-gray-700 shadow-md"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-500 w-5 h-5" />
                    </div>
                </div>

                <div className="navbar-end flex">
                    {/* Notification Bell */}
                    <div className="mr-4">
                        <li className="relative">
                            <FaBell className="sm:text-xl text-xs cursor-pointer hover:text-yellow-400 transition" />
                            <span className="absolute -top-1 -right-2 bg-blue-500 text-xs px-1 rounded-full">
                                {announcements.length > 0 && (
                                    <span className="notification-badge"> + {announcements.length}</span>
                                )}
                            </span>
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
                                    <img src={user.photoURL} alt="Profile" className="w-12 h-12 sm:w-8 sm:h-8 rounded-full p-1 bg-gray-700" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu shadow bg-gray-900/80 rounded-box w-40 mt-2">
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
