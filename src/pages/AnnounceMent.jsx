import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AnnouncementCard from "../components/AnnouncementCard";
import { useState } from "react";
import bgImg from '../assets/background/bg-1.jpg'
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import LoadingSpinner from "../shared/LoadingSpinner";



const AnnounceMent = () => {
    const axiosPublic = useAxiosPublic();
    const [sortBy, setSortBy] = useState("newest"); // sort state
    const [currentPage, setCurrentPage] = useState(1); //pagination
    const announcementsPerPage = 5; //pagination

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['announcements', sortBy],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?sort=${sortBy}`);
            return res.data;
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (posts.length === 0) {
        return null;
    }

    // Pagination Logic start here
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentPosts = posts.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    const totalPages = Math.ceil(posts.length / announcementsPerPage);

    //  Handle Previous & Next Button
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // Pagination Logic ends here

    console.log(currentPosts)
    return (
        <div className="my-12"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-4xl mx-auto mt-5 pt-24 px-2">
                <h2 className="sm:text-3xl text-xl text-center sm:text-justify font-semibold text-gray-800 mb-4 uppercase"> Welcome To Our Homepage</h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                    {/* Newest Button */}
                    <button
                        onClick={() => setSortBy("newest")}
                        className={`px-6 py-2 flex items-center gap-2 rounded-full shadow-md transition-all duration-300
                    ${sortBy === "newest"
                                ? "bg-blue-500 text-white scale-105 shadow-lg"
                                : "bg-gray-200 hover:bg-blue-400 hover:text-white"}`}
                    >
                        <FaSortAmountUpAlt /> Newest
                    </button>

                    {/* Popularity Button */}
                    <button
                        onClick={() => setSortBy("popularity")}
                        className={`px-6 py-2 flex items-center gap-2 rounded-full shadow-md transition-all duration-300
                    ${sortBy === "popularity"
                                ? "bg-purple-500 text-white scale-105 shadow-lg"
                                : "bg-gray-200 hover:bg-purple-400 hover:text-white"}`}
                    >
                        <FaSortAmountDown /> Popularity
                    </button>
                </div>
                {
                    currentPosts.map(announcement => <AnnouncementCard key={announcement._id} announcement={announcement}></AnnouncementCard>)
                }
            </div>

            {/* Beautiful Pagination Design starts here*/}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border-gray-400 text-xs sm:text-sm font-medium border-b-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ❮ Previous
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
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
                </div>

                {/* Next Button */}
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border-gray-400 text-xs sm:text-sm font-medium border-b-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next ❯
                </button>
            </div>

            {/* Beautiful Pagination Design starts here*/}

        </div>
    );
};

export default AnnounceMent;