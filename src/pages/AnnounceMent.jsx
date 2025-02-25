import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AnnouncementCard from "../components/AnnouncementCard";
import { useState } from "react";



const AnnounceMent = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1); //pagination
    const announcementsPerPage = 5; //pagination

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    })
    if (announcements.length === 0) {
        return null;
    }

    // Pagination Logic start here
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    const totalPages = Math.ceil(announcements.length / announcementsPerPage);

    //  Handle Previous & Next Button
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // Pagination Logic ends here


    return (
        <div className="my-12">
            <div className="max-w-2xl mx-auto mt-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Announcements</h2>
                {
                    currentAnnouncements.map(announcement => <AnnouncementCard key={announcement._id} announcement={announcement}></AnnouncementCard>)
                }
            </div>

            {/* Beautiful Pagination Design starts here*/}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-xs sm:text-sm font-medium border rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="px-3 py-2 text-xs sm:text-sm font-medium border rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next ❯
                </button>
            </div>

            {/* Beautiful Pagination Design starts here*/}

        </div>
    );
};

export default AnnounceMent;