import React, { useState, useEffect } from 'react';
import { Modal, Pagination, Button } from 'antd';
import Sidebar from '../../components/layouts/AdminMenu';
import Layout from '../../components/layouts/Layout';
import ProductForm from '../../components/forms/ProductForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        quantity: 0,
        shipping: false,
        image: '',
    });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        const offset = (page - 1) * itemsPerPage;
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/get-products?limit=${itemsPerPage}&offset=${offset}`);
            const { data } = response;
            if (data.success) {
                setProducts(data.products);
                setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
            } else {
                throw new Error(data.message || 'Failed to fetch Products');
            }
        } catch (error) {
            console.error('Error fetching Products:', error);
        } finally {
            setLoading(false);
        }
    };

    //get-all categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/get-category`);
            // console.log(response.datay);
            const { data } = response;
            if (data.success) {
                setCategories(data.categories);
            } else {
                throw new Error(data.message || 'Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        fetchCategories()
    }, [])

    const handleDelete = async (productId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/product/delete-product/${productId}`);
            if (data.success) {
                toast.success(data.message);
                fetchProducts();
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error('Something went wrong in deleting');
        }
    };

    const toggleModal = (type, data = { name: '', id: null }) => {
        setModalType(type);
        setFormData({ ...formData, ...data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('formData:', formData);
        try {
            const formDataObj = new FormData();
            for (const key in formData) {
                formDataObj.append(key, formData[key]);
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/product/create-product`, formDataObj);

            if (data.success) {
                toast.success(`${formData.name} created`);
                toggleModal(null);
                fetchProducts(currentPage);
                // Clear the form data after successful submission
                setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    quantity: 0,
                    shipping: false,
                    image: '', // Optionally clear the image field as well
                });
            } else {
                toast.error(data.message || 'Failed to create product');
            }
        } catch (error) {
            toast.error('Something went wrong creating category');
        }
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'category', label: 'Category', type: 'dropdown', options: categories },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        { name: 'shipping', label: 'Shipping', type: 'checkbox' },
        { name: 'image', label: 'Image URL', type: 'image' },
    ];


    return (
        <Layout>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 px-8 py-4">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold">All Products</h1>
                        <Button type="primary" onClick={() => toggleModal('create')} >Add Product</Button>
                    </div>
                    <Modal
                        open={!!modalType}
                        onCancel={() => toggleModal(null)}
                        footer={null}
                    >
                        <ProductForm
                            fields={fields}
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSubmit}
                            submitName="Add Product"
                        />
                    </Modal>
                    <div className="bg-white shadow-md rounded-md p-4">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Product Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                    <th className="border border-gray-300 px-4 py-2">Price</th>
                                    <th className="border border-gray-300 px-4 py-2">Category</th>
                                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                    <th className="border border-gray-300 px-4 py-2">Shipping</th>
                                    <th className="border border-gray-300 px-4 py-2">Image</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="border border-gray-300">
                                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.category ? product.category.name : 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.shipping ? 'true' : 'false'}</td>
                                        <td className="border border-gray-300 px-4 py-2"><img src={product.image || ''} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                                        <td className="border border-gray-300 px-4 py-2  flex gap-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">
                                                <FaEdit />
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded" onClick={() => handleDelete(product._id)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {loading && <p>Loading...</p>}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            current={currentPage}
                            onChange={setCurrentPage}
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

export default ProductPage;
