import React from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import Layout from '../../components/layouts/Layout'


const Profile = () => {
    return (
        <Layout>
            <div className="flex">
                <UserMenu />
                <div className="flex-1 m-8">
                    <h1>profile page</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
