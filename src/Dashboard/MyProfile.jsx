import useAuth from "../hooks/useAuth";

const MyProfile = () => {
    const { user } = useAuth();
   
    


    return (
        <div className="p-5 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src={ user?.photoURL} alt="Profile" />
            <h2 className="text-center text-xl font-semibold mt-2">{ user?.displayName}</h2>
            <p className="text-center text-gray-500">{ user?.email}</p>

            {/* Show Recent Posts */}
            <h3 className="mt-6 text-lg font-semibold">Recent Posts</h3>
            {/* <ul className="mt-2 space-y-2">
                {profile?.posts?.length > 0 ? (
                    profile.posts.map((post, index) => (
                        <li key={index} className="p-3 bg-gray-100 rounded-lg">
                            <h4 className="text-lg font-semibold">{post.title}</h4>
                            <p className="text-gray-500">Votes: {post.votes}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts available</p>
                )}
            </ul> */}
        </div>
    );
};

export default MyProfile;
