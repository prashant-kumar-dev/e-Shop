import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'

const Orders = () => {
    return (
        <Layout>
            <div className="flex">
                <UserMenu />
                <div className="flex-1 m-8">
                    <h1>orders page</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
