import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";

const MyProfile = () => {
    const { user } = useAuth();
    const email = user?.email;
    const axiosPublic = useAxiosPublic();

    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['profile', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/profile/${email}`)
            return res.data;
        }
    })
    console.log(profile)

    if (isLoading) return <LoadingSpinner />
    if (error) return <p>Error: {error.message}</p>;
    if (!profile) {
        return <p>Profile not found</p>;
    }

    return (
        <>
            <div className="p-6 max-w-xl mx-auto flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                    <img className="w-20 h-20 rounded-full border-2 border-gray-300" src={profile.image} alt={profile.name} />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                        <p className="text-gray-600 text-sm">{profile.email}</p>
                    </div>
                </div>

                {/* Badges */}
                <div className="mt-6">
                    {profile.isMember ? (
                        <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">🏆 Gold Badge</span>
                    ) : (
                        <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">🥉 Bronze Badge</span>
                    )}
                </div>

                {/* Responsive Design */}
                <div className="mt-6 md:flex md:items-center md:space-x-6">
                    {/* More info or buttons can go here */}
                </div>
            </div>



            {/* Recent Posts */}
            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Recent Posts</h3>
                {profile.results.length === 0 ? (
                    <p className="text-gray-500">No recent posts</p>
                ) : (
                    <ul className="space-y-6">
                        {profile.results.map((post) => (
                            <li key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    {/* Post Image */}
                                    <div className="w-full md:w-1/3">
                                        <img className="w-full h-56 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg" src={post.image} alt={post.postTitle} />
                                    </div>

                                    {/* Post Details */}
                                    <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                                        <h4 className="font-semibold text-xl text-gray-900 mb-2">{post.postTitle}</h4>
                                        <p className="text-gray-700 text-base mb-2">{post.postDescription}</p>
                                        <p className="text-gray-600 text-sm">By {post.authorName}</p>
                                        <p className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleString()}</p>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{post.tag}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-600 text-sm font-semibold">Upvotes: {post.upVote}</span>
                                                <span className="text-gray-600 text-sm font-semibold">|</span>
                                                <span className="text-gray-600 text-sm font-semibold">Downvotes: {post.downVote}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>



        </>
    );
};

export default MyProfile;
