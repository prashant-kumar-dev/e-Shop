import React from 'react';
import Layout from '../../components/layouts/Layout';
import Sidebar from '../../components/layouts/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();
    const { user } = auth;

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/5">
                    <Sidebar />
                </div>
                <div className="w-full lg:w-4/5 p-4">
                    <div className="bg-white p-6">
                        <h1 className="text-3xl lg:text-3xl font-bold mb-4 text-blue-600">Admin Dashboard</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="border border-gray-300 rounded-lg p-4">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-2">Name:</h2>
                                <p className="text-gray-800">{user.name}</p>
                                <h2 className="text-xl lg:text-2xl font-semibold mb-2 mt-4">Phone:</h2>
                                <p className="text-gray-800">{user.phone ? user.phone : 'Phone not provided'}</p>
                            </div>
                            <div className="border border-gray-300 rounded-lg p-4">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-2">Email:</h2>
                                <p className="text-gray-800">{user.email ? user.email : 'Email not provided'}</p>
                                <h2 className="text-xl lg:text-2xl font-semibold mb-2 mt-4">Address:</h2>
                                <p className="text-gray-800">{user.address ? user.address : 'Address not provided'}</p>
                            </div>
                        </div>
                        {/* Other Dashboard Content Goes Here */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
