import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-800 border dark:bg-gray-900 sticky top-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blog App
          </span>
          <div className="flex items-center gap-8 ">
            <Link
              to="/"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Blog
            </Link>

            <Link
              to="/search"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Search
            </Link>
            <Link
              to="/Users"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Users
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
