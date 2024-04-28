import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen">
            <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
            <ul className="py-4">
                <li>
                    <Link to="/dashboard/admin/create-category" className="block py-2 px-4 hover:bg-gray-800">Categories</Link>
                </li>
                <li>
                    <Link to="/dashboard/admin/create-product" className="block py-2 px-4 hover:bg-gray-800">Products</Link>
                </li>
                <li>
                    <Link to="/dashboard/admin/create-user" className="block py-2 px-4 hover:bg-gray-800">Users</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
