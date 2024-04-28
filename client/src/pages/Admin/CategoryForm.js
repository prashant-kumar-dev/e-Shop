
import React, { useState } from 'react';
import Sidebar from '../../components/layouts/AdminMenu';
import Layout from '../../components/layouts/Layout';

const CategoryForm = ({ onSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
        setName('');
    };

    return (
        <Layout>
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Create Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border"
                        />
                        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryForm;
