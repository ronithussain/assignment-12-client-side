import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddTag from "./AddTag";
import useAuth from "../../hooks/useAuth";
import { FaComment, FaPooStorm, FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';




const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = [], isLoading, } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            console.log("Fetched Stats:", res.data);
            return res.data;
        }
    });

    // pieCharts_____________________
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChartData = [
        { name: "Users", value: stats?.users || 0 },
        { name: "Posts", value: stats?.posts || 0 },
        { name: "Comments", value: stats?.comments || 0 },
    ];


    if (isLoading) return <div className="text-center">Loading...</div>;

    return (
        <>
            <div className="max-w-auto mx-auto p-2 sm:p-6 bg-white shadow-lg rounded-lg">
                {/* Profile Information */}
                <div className="flex flex-col items-center  pb-6 mb-6">
                    <img src={user.photoURL} alt={user.displayName} className="sm:w-32 sm:h-32 rounded-full border-4 border-gray-300" />
                    <h2 className="text-xs sm:text-3xl font-bold mt-4 text-gray-800">Hi,  {user.displayName} Welcome Back!</h2>
                    <p className="text-xs sm:text-lg text-gray-600">{user.email}</p>
                </div>
                <div className="divider"></div>

                {/* stats */}
                <div className="rounded-sm shadow flex flex-col lg:flex-row justify-center gap-4 md:gap-8 p-4 bg-gradient-to-r from-slate-100 to-slate-300">
                    {/* Stats Section */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 sm:p-4 w-full lg:w-1/2">
                        {/* Users Stat */}
                        <div className=" flex items-center gap-2 bg-[#97c2e7]  rounded-sm p-4 w-full sm:w-1/3">
                            <div className="stat-figure text-3xl md:text-5xl text-gray-600">
                                <FaUsers />
                            </div>
                            <div>
                                <div className="stat-value text-lg md:text-2xl">{stats.users}</div>
                                <div className="stat-title text-sm md:text-base">Users</div>
                            </div>
                        </div>

                        {/* Posts Stat */}
                        <div className="stat flex items-center gap-2 bg-[#8be4d4]  rounded-sm p-4 w-full sm:w-1/3">
                            <div className="stat-figure text-3xl md:text-5xl text-gray-600">
                                <FaPooStorm />
                            </div>
                            <div>
                                <div className="stat-value text-lg md:text-2xl">{stats.posts}</div>
                                <div className="stat-title text-sm md:text-base">Posts</div>
                            </div>
                        </div>

                        {/* Comments Stat */}
                        <div className="stat flex items-center gap-2 bg-[#e2cb98]  rounded-sm p-4 w-full sm:w-1/3">
                            <div className="stat-figure text-3xl md:text-5xl text-gray-600">
                                <FaComment />
                            </div>
                            <div>
                                <div className="stat-value text-lg md:text-2xl">{stats.comments}</div>
                                <div className="stat-title text-sm md:text-base">Comments</div>
                            </div>
                        </div>
                    </div>

                    {/* Responsive Pie Chart */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <ResponsiveContainer width="50%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Add Tag Section */}
                <div className="mt-6">
                    <AddTag />
                </div>
            </div>
        </>
    );
};

export default AdminProfile;
