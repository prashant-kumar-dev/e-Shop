import React from 'react'
import Layout from '../../components/layouts/Layout'
import Sidebar from '../../components/layouts/AdminMenu';


const AdminDashboard = () => {
    return (
        <Layout>
            <div className="flex">
                <div className="flex-1">
                    <Sidebar />
                </div>
            </div>
        </Layout>

    )
}

export default AdminDashboard
