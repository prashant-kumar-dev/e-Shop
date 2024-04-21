import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto py-8 px-4 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm">A brief description about your company or website. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="text-sm">
                            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
                            <li><Link to="/product" className="hover:text-blue-500">Products</Link></li>
                            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-500">Contact Us</Link></li>
                            <li><Link to="/policy" className="hover:text-blue-500">Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm">Email: contact@example.com</p>
                        <p className="text-sm">Phone: +123-456-7890</p>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 ml-4">
                    <Link to="/" className="text-white hover:text-blue-500"><i className="fab fa-facebook-f"></i></Link>
                    <Link to="/" className="text-white hover:text-blue-500"><i className="fab fa-twitter"></i></Link>
                    <Link to="/" className="text-white hover:text-blue-500"><i className="fab fa-instagram"></i></Link>
                    <Link to="/" className="text-white hover:text-blue-500"><i className="fab fa-linkedin"></i></Link>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-gray-800 py-2 text-sm text-center">
                &copy; 2024 Your Company. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
