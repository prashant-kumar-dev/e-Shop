import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { PiCaretDownLight } from 'react-icons/pi';
import { IoMdSearch } from 'react-icons/io';
import { MdAssignmentInd } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';
import { BsCart4 } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import toast from 'react-hot-toast';

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()

    const showSideMenu = () => {
        setToggle(true);
    };

    const hideSideMenu = () => {
        setToggle(false);
    };

    const handleLogout = () => {
        // Call your logout method from the auth context
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        setTimeout(() => {
            toast.success('Logout successfully..!!');
            navigate('/login');
        })
    };

    const links = [
        {
            icons: <IoMdSearch />,
            name: 'Search',
            path: '',
        },
        {
            icons: <TbCategoryPlus />,
            name: 'Category',
            path: '',
        },
        {
            icons: <MdAssignmentInd />,
            name: auth.user ? 'Logout' : 'Login',
            path: '/login',
            onClick: auth.user ? handleLogout : null, // Add onClick handler for Logout button
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
                    className="black-overlay w-full h-full fixed duration-500"
                    onClick={hideSideMenu}
                    style={{
                        opacity: toggle ? 1 : 0,
                        visibility: toggle ? 'visible' : 'hidden',
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="md:w-[500px] w-3/4 bg-white h-full absolute duration-[400ms]"
                        style={{
                            left: toggle ? '0%' : '-100%',
                        }}
                    ></div>
                </div>

                <header className="p-2 md:p-6 shadow-xl">
                    <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                        <div className="w-20 flex items-center md:gap-4">
                            <GiHamburgerMenu className="h-10 w-10" onClick={showSideMenu} />
                            <Link to="/" className="w-full p-2">
                                <img src="/images/logo.jpg" className="w-24" alt="Logo" />
                            </Link>
                        </div>

                        <div className="hidden md:block p-2">
                            <span className="font-bold border-b-[3px] border-black">Mohangarden</span> Uttamnangr, Delhi
                            <PiCaretDownLight onClick={showSideMenu} className="inline" />
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
