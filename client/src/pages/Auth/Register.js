import React, { useState, useRef } from 'react';
import Layout from '../../components/layouts/Layout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


//react-isons
import { TiUserOutline } from 'react-icons/ti';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { CiPhone } from 'react-icons/ci';
import { LiaAddressCardSolid } from 'react-icons/lia';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        answer: '',
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, formData);
            const { success, message } = res.data;
            toast[success ? 'success' : 'error'](message);
            if (success) {
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            console.error('Registration Error:', error);
            toast.error('Something went wrong');
        }
    };

    // Define array of input fields
    const inputFields = [
        { icon: TiUserOutline, type: 'text', name: 'name', placeholder: 'Full Name' },
        { icon: MdEmail, type: 'email', name: 'email', placeholder: 'Email Address' },
        { icon: RiLockPasswordLine, type: showPassword ? 'text' : 'password', name: 'password', value: formData.password, placeholder: 'Password' },
        { icon: CiPhone, type: 'text', name: 'phone', placeholder: 'Phone' },
        { icon: LiaAddressCardSolid, type: 'text', name: 'address', placeholder: 'Address' },
        { icon: FaRegCircleQuestion, type: 'text', name: 'answer', placeholder: 'What is your Favorite sports?' },
    ];

    return (
        <Layout title="Register Page - Eshop">
            <div className="md:flex">
                <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
                    <div>
                        <h1 className="text-white font-bold text-4xl font-sans">Sign Up</h1>
                        <p className="text-white mt-1">Create an account to get started</p>
                        <button type="button" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
                            Read More
                        </button>
                    </div>
                </div>
                <div className="flex md:w-1/2 justify-center py-28 items-center bg-white">
                    <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-gray-800 font-bold text-2xl mb-4">Create Account</h1>
                        {/* Map over inputFields array */}
                        {inputFields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <field.icon className="h-5 w-5 text-gray-400 mr-2" />
                                    <input
                                        className="pl-2 outline-none border-none flex-1 placeholder-gray-400"
                                        type={field.type}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required
                                    />
                                    {field.name == 'password' && (
                                        <span className="cursor-pointer" onClick={togglePasswordVisibility}>
                                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Register
                            </button>
                            <p className="text-sm">
                                Already registered?{' '}
                                <Link to="/login" className="text-indigo-500 hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
