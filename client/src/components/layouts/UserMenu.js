import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
    return (
        <div className="sw-64 min-h-screen m-8">
            <div className="p-4 text-2xl font-bold">User Dashboard</div>
            <ul className="py-4">
                <li>
                    <Link to="/dashboard/user/profile" className="block py-2 px-4 hover:bg-gray-100">Profile</Link><hr />
                </li>
                <li>
                    <Link to="/dashboard/user/orders" className="block py-2 px-4 hover:bg-gray-100">Orders</Link> <hr />
                </li>
            </ul>
        </div>
    );
};

export default UserMenu;
