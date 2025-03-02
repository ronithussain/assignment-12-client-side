import { useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import AnnouncementCard from '../components/AnnouncementCard'
import usePosts from "../hooks/usePosts";



const AnnounceMent = () => {
    const [posts, isLoading, sortBy, updateSort] = usePosts();
    const [currentPage, setCurrentPage] = useState(1); // Pagination State
    const announcementsPerPage = 5; // Pagination Per Page Limit


    
 
console.log(posts)
    if (isLoading) return <LoadingSpinner />;

    // Pagination Logic
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentPosts = posts.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);
    const totalPages = Math.ceil(posts.length / announcementsPerPage);

    return (
        <div className="my-12">
            <div className="max-w-4xl mx-auto mt-5 pt-24 px-2">
                <h2 className="sm:text-3xl text-xl text-center font-semibold text-gray-800 mb-4 uppercase">
                    Welcome To Our Homepage
                </h2>

                {/* Sorting Buttons */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                    <button
                        onClick={() => updateSort("newest")}
                        className={`px-6 py-2 flex items-center gap-2 rounded-full shadow-md transition-all duration-300
                        ${sortBy === "newest"
                            ? "bg-blue-500 text-white scale-105 shadow-lg"
                            : "bg-gray-200 hover:bg-blue-400 hover:text-white"}`}
                    >
                        <FaSortAmountUpAlt /> Newest
                    </button>

                    <button
                        onClick={() => updateSort("popularity")}
                        className={`px-6 py-2 flex items-center gap-2 rounded-full shadow-md transition-all duration-300
                        ${sortBy === "popularity"
                            ? "bg-purple-500 text-white scale-105 shadow-lg"
                            : "bg-gray-200 hover:bg-purple-400 hover:text-white"}`}
                    >
                        <FaSortAmountDown /> Popularity
                    </button>
                </div>

                {/* Announcement Cards */}
                <div>
                    {currentPosts?.map(announcement => (
                        <AnnouncementCard key={announcement._id} announcement={announcement} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border-gray-400 text-xs sm:text-sm font-medium border-b-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ❮ Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border-gray-400 text-xs sm:text-sm font-medium border-b-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnounceMent;
