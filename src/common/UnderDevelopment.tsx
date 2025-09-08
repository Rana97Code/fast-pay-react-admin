import React from "react";
import { FaTools } from "react-icons/fa";

const UnderDevelopment: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <FaTools size={64} className="text-yellow-500 mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        This Page is Under Development
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">
        We’re working hard to bring you this feature. Please check back again soon.
      </p>
    </div>
  );
};

export default UnderDevelopment;
