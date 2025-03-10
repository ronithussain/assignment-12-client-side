import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { format } from "date-fns";

const DisplayAnnouncement = () => {
    const axiosPublic = useAxiosPublic();

    const { data = [], isLoading, error } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosPublic.get("/announcements");
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-4">Loading...</p>;
    if (error) return <p className="text-center py-4 text-red-500">Error loading announcements</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {data.length > 0 ? (
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-base sm:text-3xl font-bold text-gray-800 uppercase mb-1">Latest Announcements</h2>
                        <p className="text-gray-500 sm:text-base text-xs">Stay updated with the latest news and updates from us</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((announcement) => (
                            <div key={announcement._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
                                {announcement.image ? (
                                    <img
                                        src={announcement.image}
                                        alt="Announcement"
                                        className="w-full h-48 object-cover object-center"
                                    />
                                ) : null}  {/* If no image, do not render an image */}

                                <div className="p-3 sm:p-6">
                                    <h3 className="sm:text-xl font-semibold text-gray-800">{announcement.title}</h3>
                                    <p className="text-gray-600 my-4 sm:text-base text-xs">{announcement.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={announcement.authorImage}
                                                alt="Author"
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <small className="text-gray-500 text-xs sm:text-base">{announcement.authorName}</small>
                                        </div>
                                        <div>
                                            <p className=" text-gray-500 text-xs sm:text-base">
                                                {format(new Date(announcement.createdAt), "MMMM dd, yyyy h:mm a")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No announcements available</p>
            )}
        </div>
    );
};

export default DisplayAnnouncement;
