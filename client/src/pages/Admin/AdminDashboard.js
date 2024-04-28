import React from 'react'
import Layout from '../../components/layouts/Layout'
import Sidebar from '../../components/layouts/AdminMenu';


const AdminDashboard = () => {
    // const handleCreateCategory = (data) => {
    //     console.log('Create Category:', data);
    //     // Add API call to create category
    // };

    // const handleCreateProduct = (data) => {
    //     console.log('Create Product:', data);
    //     // Add API call to create product
    // };

    // const handleCreateUser = (data) => {
    //     console.log('Create User:', data);
    //     // Add API call to create user
    // };

    return (
        <Layout>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <Sidebar />
                    {/* <CategoryForm onSubmit={handleCreateCategory} />
                    <ProductForm onSubmit={handleCreateProduct} />
                    <UserForm onSubmit={handleCreateUser} /> */}
                </div>
            </div>
        </Layout>

    )
}

export default AdminDashboard
