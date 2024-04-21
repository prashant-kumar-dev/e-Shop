import React from 'react'
import Layout from '../components/layouts/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">404 - Page Not Found</h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">Oops! The page you are looking for does not exist.</p>
                <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Go Home</Link>
            </div>
        </Layout>
    )
}

export default Pagenotfound
