import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-16">
      <h1 className="text-6xl font-bold text-brand-600 dark:text-brand-400">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the dashboard.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition dark:bg-brand-500 dark:hover:bg-brand-600"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
