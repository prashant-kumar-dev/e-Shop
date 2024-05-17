import React from 'react';
import { Link } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";

const Sidebar = () => {
    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen">

            <Link to="/dashboard/admin/">
                <div className='p-2.5 mt-2 flex items-center rounded-md px-4 '>
                    <RiAdminFill />
                    <div className="p-4 text-xl font-bold">Admin Dashboard</div>
                </div>

            </Link>
            <ul className="py-4">
                <li className='p-2.5 mt-2 flex items-center rounded-md px-4   hover:bg-gray-800'>
                    <BiSolidCategoryAlt />
                    <Link to="/dashboard/admin/create-category" className="block py-2 px-4">Categories</Link>
                </li>
                <li className='p-2.5 mt-2 flex items-center rounded-md  px-4 hover:bg-gray-800'>
                    <FaProductHunt />
                    <Link to="/dashboard/admin/create-product" className="block py-2 px-4">Products</Link>
                </li>
                <li className='p-2.5 mt-2 flex items-center rounded-md  px-4 hover:bg-gray-800'>
                    <FaUsersGear />
                    <Link to="/dashboard/admin/create-user" className="block py-2 px-4">Users</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
