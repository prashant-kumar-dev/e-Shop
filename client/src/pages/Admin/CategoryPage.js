import React, { useState, useEffect } from 'react';
import { Modal, Button, Pagination } from 'antd'; // Import Pagination component from antd
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../../components/layouts/AdminMenu';
import Layout from '../../components/layouts/Layout';
import CategoryForm from '../../components/forms/CategoryForm';
import toast from 'react-hot-toast';
import axios from 'axios';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [formData, setFormData] = useState({ name: '', id: null, image: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Items per page
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const toggleModal = (type, data = { name: '', image: '', id: null }) => {
        setModalType(type);
        setFormData({ ...formData, ...data });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // const { name, id } = formData;
        // console.log(formData);
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        const apiUrl = formData._id
            ? `${process.env.REACT_APP_API_URL}/api/v1/category/update-category/${formData._id}`
            : `${process.env.REACT_APP_API_URL}/api/v1/category/create-category`;

        try {
            const { data } = await axios[formData._id ? 'put' : 'post'](apiUrl, formDataObj);
            if (data.success) {
                toast.success(`${formData.name} ${formData._id ? 'updated' : 'created'}`);
                toggleModal(null);
                fetchCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(`Something went wrong ${formData._id ? 'updating' : 'creating'} category`);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/category/delete-category/${categoryId}`);
            if (data.success) {
                toast.success(data.message);
                fetchCategories();
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error('Something went wrong in deleting');
        }
    };

    const fetchCategories = async (currentPage) => {
        const offset = (currentPage - 1) * itemsPerPage;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/get-category?limit=${itemsPerPage}&offset=${offset}`);
            // console.log(response.datay);
            const { data } = response;
            if (data.success) {
                setCategories(data.categories);
                setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
            } else {
                throw new Error(data.message || 'Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Something went wrong in getting categories');
        }
    };

    return (
        <Layout>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 w-full px-8 py-4">
                    <div className="flex justify-end mb-4">
                        <Button type="primary" onClick={() => toggleModal('create')}>
                            Add Category
                        </Button>
                    </div>
                    <Modal
                        open={!!modalType}
                        onCancel={() => toggleModal(null)}
                        footer={null}
                    >
                        <CategoryForm
                            handleSubmit={handleFormSubmit}
                            value={formData}
                            setValue={setFormData}
                            submitName={modalType === 'create' ? 'Create Category' : 'Update Category'}
                        />
                    </Modal>
                    <h1 className="text-2xl font-bold mb-1">All Categories</h1>
                    <div className="bg-white shadow-md rounded-md p-4">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Category Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Image</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id} className="border border-gray-300">
                                        <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                        <td className="border border-gray-300 px-4 py-2"><img src={category.image || ''} alt={category.name} style={{ width: '50px', height: '50px' }} /></td>
                                        <td className="border border-gray-300 px-4 py-4  flex gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => toggleModal('update', { name: category.name, image: category.image, id: category._id })}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            current={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                            total={totalPages * itemsPerPage}
                            pageSize={itemsPerPage}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
