import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout title={"Dashboard eshop"}>
            <div className="flex">
                <UserMenu />
                <div className="flex-1">
                    {/* userdetail */}
                    <div className="p-8">
                        <div className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-xl font-semibold mb-4">User Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">Username:</p>
                                    <p className="font-semibold">{auth?.user?.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Email:</p>
                                    <p className="font-semibold">{auth?.user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Address:</p>
                                    <p className="font-semibold">{auth?.user?.address}</p>
                                </div>
                                {/* Add more admin details */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
