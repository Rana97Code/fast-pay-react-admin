import { useQuery } from "@apollo/client";
import { FaUsers, FaProjectDiagram, FaClipboardList, FaBlog } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { GET_DASHBOARD_STATICTICS } from "../graphql/queries/queries";

const Home = () => {
  const { data } = useQuery(GET_DASHBOARD_STATICTICS)
  return (
    <div className="p-8 flex flex-col items-center justify-center">

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full max-w-screen-xl">

        {/* Total Employees */}
        <div className="relative bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-7 flex items-center justify-between shadow-2xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-purple-glow">
          <div className="absolute inset-0 bg-white opacity-5 rounded-2xl pointer-events-none"></div> {/* Subtle overlay */}
          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-1">Total Employees</h3>
            <p className="text-4xl font-bold text-white leading-tight">{data?.dashboardCounts?.totalEmployees}</p>
          </div>
          <FaUsers className="text-5xl text-purple-300 opacity-75" />
        </div>

        {/* Total Projects */}
        <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-7 flex items-center justify-between shadow-2xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-blue-glow">
          <div className="absolute inset-0 bg-white opacity-5 rounded-2xl pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-semibold text-blue-200 mb-1">Total Projects</h3>
            <p className="text-4xl font-bold text-white leading-tight">{data?.dashboardCounts?.totalProjects}</p>
          </div>
          <FaProjectDiagram className="text-5xl text-blue-300 opacity-75" />
        </div>

        {/* Total Blogs */}
        <div className="relative bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-7 flex items-center justify-between shadow-2xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-red-glow">
          <div className="absolute inset-0 bg-white opacity-5 rounded-2xl pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-semibold text-red-200 mb-1">Total Blogs</h3>
            <p className="text-4xl font-bold text-white leading-tight">{data?.dashboardCounts?.totalBlogs}</p>
          </div>
          <FaBlog className="text-5xl text-red-300 opacity-75" />
        </div>

        {/* Total Jobs Published */}
        <div className="relative bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-2xl p-7 flex items-center justify-between shadow-2xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-yellow-glow">
          <div className="absolute inset-0 bg-white opacity-5 rounded-2xl pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-200 mb-1">Total Jobs Published</h3>
            <p className="text-4xl font-bold text-white leading-tight">{data?.dashboardCounts?.totalJobsPublishedList}</p>
          </div>
          <MdWorkOutline className="text-5xl text-yellow-300 opacity-75" />
        </div>

        {/* Total Job Applications */}
        <div className="relative bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-7 flex items-center justify-between shadow-2xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-teal-glow">
          <div className="absolute inset-0 bg-white opacity-5 rounded-2xl pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-semibold text-teal-200 mb-1">Total Job Applications</h3>
            <p className="text-4xl font-bold text-white leading-tight">{data?.dashboardCounts?.totalResumes}</p>
          </div>
          <FaClipboardList className="text-5xl text-teal-300 opacity-75" />
        </div>

      </div>
    </div>
  );
};

export default Home;