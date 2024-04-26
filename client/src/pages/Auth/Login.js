import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { useAuth } from '../../context/auth';

import { TiUserOutline } from 'react-icons/ti';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, formData);
            const { success, message, user, token } = res.data;
            if (success) {
                const authData = { ...auth, user, token };
                setAuth(authData);
                localStorage.setItem('auth', JSON.stringify(authData));
            }
            // Show the toast message based on success or failure
            toast[success ? 'success' : 'error'](message);
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Something went wrong');
        }
    };
    useEffect(() => {
        if (auth.token) {
            navigate(location.state || '/');
        }
    }, [auth.token, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const inputFields = [
        { icon: TiUserOutline, type: 'text', name: 'email', value: formData.email, placeholder: 'Email' },
        { icon: RiLockPasswordLine, type: showPassword ? 'text' : 'password', name: 'password', value: formData.password, placeholder: 'Password' },
    ];
    return (
        <Layout title={'Login - Eshop'}>
            <div className="md:flex">
                {/* Hidden div */}
                <div className="relative overflow-hidden md:flex w-full md:w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 text-white justify-center items-center hidden">
                    {/* Adjusted flexbox and text-align properties */}
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                        <p className="text-lg mb-8">Login to your account</p>
                        <TiUserOutline className="h-10 w-10 mb-3" />
                        <RiLockPasswordLine className="h-10 w-10 mb-3" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center bg-white my-36">
                    <form onSubmit={handleSubmit} className="w-full max-w-sm p-8">
                        <h1 className="text-2xl font-bold mb-4">Login</h1>
                        {/* Mapping over inputFields array */}
                        {inputFields.map((field, index) => (
                            <div key={index} className="flex items-center border-b-2 py-2 mb-4">
                                <field.icon className="h-6 w-6 mr-2 text-gray-500" />
                                <input
                                    className="outline-none flex-1"
                                    type={field.type}
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                />
                                {field.name == 'password' && (
                                    <span className="cursor-pointer" onClick={togglePasswordVisibility}>
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </span>
                                )}
                            </div>
                        ))}
                        <button type="submit" className="block w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold mb-4">
                            Login
                        </button>
                        <div className="text-center mb-4">
                            <span className="text-sm block mb-2">
                                <Link to="/forgot-password" className="text-blue-500 hover:underline">
                                    Forgot Password?
                                </Link>
                            </span>
                            <span className="text-sm">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-500 hover:underline">
                                    SIGN UP
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
