import React, { useState } from 'react'
import { useAuth } from '../../context/auth';
//sidebar icons
import { IoIosHome } from "react-icons/io";
import { BsChevronDown } from 'react-icons/bs';
import { FaBookmark } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5"
import { IoMdLogOut } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar, toggle, handleLogout }) => {
	const [auth] = useAuth();
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const toggleSubMenu = () => {
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	return (
		<div className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] duration-[400ms] overflow-y-auto text-center bg-gray-900`} onClick={(e) => {
			e.stopPropagation();
		}} style={{
			left: toggle ? '0%' : '-100%',
		}}>
			<div className="p-2.5 mt-1 flex items-center justify-between">
				<div className="flex items-center">
					<i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
					<h1 className="font-bold text-gray-200 text-[15px] ml-3">TailwindCSS</h1>
				</div>
				<FaWindowClose className="cursor-pointer text-gray-200 text-lg" onClick={toggleSidebar} />
			</div>
			<div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
				<i className="bi bi-search text-sm" />
				<input type="text" placeholder="Search" className="text-[15px] ml-4 w-full bg-transparent focus:outline-none" />
			</div>
			<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
				<IoIosHome />
				<span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
			</div>
			<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
				<FaBookmark />
				<span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
			</div>
			<div className="my-4 bg-gray-600 h-[1px]" />
			<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" onClick={toggleSubMenu}>
				<IoChatboxEllipses />
				<div className="flex justify-between w-full items-center">
					<span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
					<span className={`text-sm ${isSubMenuOpen ? 'rotate-180' : ''}`}>
						<BsChevronDown />
					</span>
				</div>
			</div>
			<div className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${isSubMenuOpen ? '' : 'hidden'}`}>
				<h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
					Social
				</h1>
				<h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
					Personal
				</h1>
				<h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
					Friends
				</h1>
			</div>
			{
				auth.user
					? (
						<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" onClick={handleLogout}>
							<IoMdLogIn />
							<span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
						</div>
					)
					: (
						<Link to="/login">
							<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
								<IoMdLogOut />
								<span className="text-[15px] ml-4 text-gray-200 font-bold">Login</span>
							</div>
						</Link>

					)
			}

		</div>
	)
}

export default Sidebar
