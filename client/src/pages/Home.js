import React from 'react';
import Layout from '../components/layouts/Layout';
import Category from '../components/Category';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <Layout>
            <Category />
            <div
                className="relative flex items-center justify-center min-h-screen"
                style={{
                    backgroundImage: `url(/images/home.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-green-900 opacity-90">
                    {/* Text Container */}
                    <div className="text-center text-white p-8 md:p-12 max-w-lg rounded-lg shadow-lg">
                        <h1 className="text-5xl font-bold mb-4">Welcome to My Plant Shop</h1>
                        <p className="text-lg mb-8">
                            Explore a world of beautiful plants for your home and garden.
                        </p>
                        <a
                            href="/shop"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out inline-block"
                        >
                            Explore Now
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                {/* ProductList component to display all products */}
                <h2 className="text-2xl font-semibold mb-4 text-center">Featured Products</h2>
                <ProductList />
            </div>
        </Layout>
    );
};

export default Home;
