import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: '', newPassword: '', securityQuestion: '' });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form Data:', formData);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/forgot-password`, formData);
            const { success, message } = res.data;
            toast[success ? 'success' : 'error'](message);
            if (success) {
                setTimeout(() => navigate('/login'), 2000);
            }

        } catch (error) {
            console.error('Password Reset Error:', error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Your Password?</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">Enter the required information to reset your password</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}>
                                <label htmlFor={key} className="sr-only">{key === 'newPassword' ? 'New Password' : key}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type={key === 'email' ? 'email' : key === 'newPassword' ? 'password' : 'text'}
                                    autoComplete={key === 'email' ? 'email' : key === 'newPassword' ? 'new-password' : 'off'}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={key === 'newPassword' ? 'New Password' : key}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
