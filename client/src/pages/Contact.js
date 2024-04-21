// Contact.js
import React from 'react';
import Layout from '../components/layouts/Layout';
import { MdOutlineMail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { LiaAddressCardSolid } from "react-icons/lia";

const Contact = () => {
    return (
        <Layout title={'contact-us'}>
            <div className="min-h-screen bg-gray-100">
                {/* Cover Image Section */}
                <div className="relative h-64 md:h-80">
                    <img
                        className="w-full h-full object-cover"
                        src="/images/contact.jpeg"
                        alt="Contact Cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">Contact Us</h1>
                    </div>
                </div>
                {/* Contact Information and Form Section */}
                <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 md:items-center">
                    {/* Contact Information */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <ul className="text-lg text-gray-700">
                                <li><MdOutlineMail className='inline' /> : example@example.com</li>
                                <li><CiPhone className='inline' /> : +1 234-567-890</li>
                                <li><LiaAddressCardSolid className='inline' /> : 1234 Main St, City, Country</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:w-1/2">
                        <form action='#' method='POST' className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
                                <input type="text" id="name" name="name" className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
                                <textarea id="message" name="message" rows="4" className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"></textarea>
                            </div>
                            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
