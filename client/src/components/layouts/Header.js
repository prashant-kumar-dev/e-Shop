import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { IoMdSearch } from 'react-icons/io';
import { MdAssignmentInd } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';
import { BsCart4 } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsChevronDown } from 'react-icons/bs'; // Dropdown icon

import toast from 'react-hot-toast';

import Sidebar from './Sidebar';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [toggle, setToggle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);


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

    const toggleSidebar = useCallback(() => {
        setToggle(!toggle);
    }, [toggle]);

    const handleLogout = useCallback(() => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        setTimeout(() => {
            toast.success('Logout successfully..!!');
            navigate('/login');
        }, 1000);
    }, [auth, navigate, setAuth]);

    const handleSearch = useCallback(() => {
        // Add your search logic here, such as navigating to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }, [navigate, searchQuery]);


    const Dropdown = ({ isOpen, toggleDropdown }) => {
        return (
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"
                    type="button"
                >
                    <MdAssignmentInd className="h-7 w-7" />
                    <div className="text-sm">{`Hi ${auth.user ? auth.user.name : 'guest'}`}</div>
                    <BsChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute mt-1 py-2 w-36 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                        {/* Dropdown menu */}
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {
                                !auth.user && (<li>
                                    <Link to='/login' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Login/Register
                                    </Link>
                                </li>)
                            }
                            <li>
                                {auth.user ? (
                                    <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Account
                                    </Link>
                                ) : (
                                    <Link to='/login' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        My Account
                                    </Link>
                                )}
                            </li>
                            <li>
                                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Settings
                                </Link>
                            </li>
                            {
                                auth.user && (<li>
                                    <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Logout
                                    </button>
                                </li>)
                            }

                        </ul>
                    </div>
                )}
            </div>
        );
    };

    const [isOpen, setIsOpen] = useState(false);
    const links = [

        {
            icons: <TbCategoryPlus />,
            name: 'Category',
            path: '',
        },
        {
            icons: <Dropdown isOpen={isOpen} toggleDropdown={() => setIsOpen(!isOpen)} />, // Using Dropdown component here
            name: '',
            path: '',
        },
        {
            icons: (
                <div className="relative">
                    <BsCart4 className="h-7 w-7" />
                    <sup className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs absolute -top-2 -right-2">
                        {3}
                    </sup>
                </div>
            ),
            name: '',
            path: '/cart',
        },
    ];

    return (
        <>
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <div
                    className={`black-overlay fixed inset-0 opacity-1 z-50 ${toggle ? 'block' : 'hidden'}`}
                    onClick={toggleSidebar}
                >
                    <Sidebar toggle={toggle} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
                </div>



                <header className="p-2 md:p-6 shadow-xl">
                    <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                        <div className="w-20 flex items-center md:gap-4">
                            <GiHamburgerMenu className="h-10 w-10" onClick={toggleSidebar} />
                            <Link to="/" className="w-full p-2">
                                <img src="/images/logo.jpg" className="w-24" alt="Logo" />
                            </Link>
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            <div className='relative flex items-center text-blue-400 cursor-pointer '>
                                <div className='flex'>
                                    <span>All Category</span>
                                    <div onClick={() => setShowDropdown(!showDropdown)}>
                                        <BsChevronDown className="h-4 w-4 m-2" />
                                    </div>
                                </div>

                                {showDropdown && (
                                    <div className="absolute top-full left-0 z-10 mt-1 w-36 bg-white border border-gray-400 rounded-md shadow-lg overflow-y-auto max-h-60">
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            >
                                                {category.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="relative flex-grow max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="py-1 px-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <IoMdSearch
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={handleSearch}
                                />
                            </div>
                        </div>
                        <nav className="flex items-center space-x-4 md:gap-4">
                            {links.map((link, index) => (
                                <div key={index} onClick={link.onClick}>
                                    <Link to={link.path}>
                                        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                                            {link.icons}
                                            {link.name}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;
