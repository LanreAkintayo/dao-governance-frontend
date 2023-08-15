import React from "react";
import Link from "next/link";
import { FaTimes, FaHome, FaJoget } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { MdHowToVote } from "react-icons/md";
import { useRouter } from "next/router";

interface SidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, closeSidebar }) => {
  const router = useRouter();
  const currentUrl = router.asPath;

  console.log("Current url: ", currentUrl == "/");

  return (
    <div
      className={`fixed top-0 left-0 bg-gradient-to-r from-red-50 via-red-50 to-red-100 h-screen w-64 p-4 shadow transform transition-transform duration-300 ease-in-out ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <div
        className="w-full flex justify-end hover:text-red-800"
        onClick={closeSidebar}
      >
        <FaTimes />
      </div>

      <ul className="flex flex-col space-y-7">
        <li className=" mt-12">
          <Link href="/" className={``}>
            <a
              onClick={closeSidebar}
              className={`hover:text-gray-400 cursor-pointer flex space-x-4 items-center ${
                currentUrl == "/" &&
                "border-t-0 border-l-0 border-r-0 border-b border-red-700 text-red-700"
              }`}
            >
              <FaHome />
              <p>Home</p>
            </a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/token">
            <a
              onClick={closeSidebar}
              className={`hover:text-gray-400 cursor-pointer flex space-x-4 items-center ${
                currentUrl == "/token" &&
                "border-t-0 border-l-0 border-r-0 border-b border-red-700 text-red-700"
              }`}
            >
              <FaJoget />

              <p>Get LAR Token</p>
            </a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/create">
            <a
              onClick={closeSidebar}
              className={`hover:text-gray-400 cursor-pointer flex space-x-4 items-center ${
                currentUrl == "/create" &&
                "border-t-0 border-l-0 border-r-0 border-b border-red-700 text-red-700"
              }`}
            >
              <IoMdCreate />
              <p>Create Proposal</p>
            </a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/proposals">
            <a
              onClick={closeSidebar}
              className={`hover:text-gray-400 cursor-pointer flex space-x-4 items-center ${
                currentUrl == "/proposals" &&
                "border-t-0 border-l-0 border-r-0 border-b border-red-700 text-red-700"
              }`}
            >
              <MdHowToVote />

              <p>Vote</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
