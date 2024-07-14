import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import CommonSpinner from '../components/CommonSpinner';
import Breadcrumb from '../components/Breadcrumb';
import { FaRupeeSign } from "react-icons/fa";

function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const [isRotated, setIsRotated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
    }, [params.slug]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/single-product/${params.slug}`);
            const data = response.data;
            setProduct(data.product);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlus = () => {
        setQuantity(quantity + 1);
    };

    const handleRotate = () => {
        setIsRotated(!isRotated);
    };

    // Define breadcrumb paths
    const breadcrumbPaths = [
        { title: 'Home', link: '/' },
        { title: product?.category?.name ?? '', link: product && product.category ? `/${product.category.slug}` : '/' }, // Current category
        { title: product?.name ?? '', link: product ? `/products/${product.slug}` : '' }, // Product link
    ];

    return (
        <Layout>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                {loading ? (
                    <CommonSpinner />
                ) : (
                    <>
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Image Preview Section */}
                            <div className="lg:w-1/2">
                                <div className="flex justify-center gap-4">
                                    <div className="w-full bg-gray-100 flex justify-center items-center">
                                        <img
                                            className="object-contain h-80 w-full"
                                            src={product.image} alt={product.name}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        {[...Array(3)].map((_, index) => (
                                            <div key={index} className="bg-gray-100 flex justify-center items-center py-4">
                                                <img
                                                    className="object-contain h-32 w-full"
                                                    src={product.image} alt={`${product.name} ${index}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="lg:w-1/2">
                                <div className="w-full items-center">
                                    <Breadcrumb paths={breadcrumbPaths} />
                                    <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white mt-4">
                                        {product.name}
                                    </h2>

                                    <div className="flex flex-row justify-between mt-5">
                                        <img
                                            className="dark:hidden"
                                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1.svg"
                                            alt="stars"
                                        />
                                        <img
                                            className="hidden dark:block"
                                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1dark.svg"
                                            alt="stars"
                                        />
                                        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 dark:text-white duration-100 cursor-pointer">
                                            22 reviews
                                        </p>
                                    </div>

                                    <p className="font-normal text-base leading-6 text-gray-600 mt-7">
                                        {product.description}
                                    </p>
                                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-white">
                                        <FaRupeeSign className='inline' />{product.price}
                                    </p>

                                    <div className="lg:mt-11 mt-10">
                                        <div className="flex flex-row justify-between">
                                            <p className="font-medium text-base leading-4 text-gray-600">Select quantity</p>
                                            <div className="flex">
                                                <span
                                                    onClick={handleMinus}
                                                    className="focus:outline-none dark:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                                                >
                                                    -
                                                </span>
                                                <input
                                                    id="counter"
                                                    aria-label="input"
                                                    className="border dark:text-white border-gray-300 dark:bg-transparent h-full text-center w-14 pb-1"
                                                    type="text"
                                                    value={quantity}
                                                    readOnly
                                                />
                                                <span
                                                    onClick={handlePlus}
                                                    className="focus:outline-none dark:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1"
                                                >
                                                    +
                                                </span>
                                            </div>
                                        </div>
                                        <hr className="bg-gray-200 w-full my-2" />
                                        <div className="flex flex-row justify-between items-center mt-4">
                                            <p className="font-medium text-base leading-4 text-gray-600">Dimensions</p>
                                            <img
                                                onClick={handleRotate}
                                                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform duration-100 ${isRotated ? 'rotate-180' : ''} dark:hidden`}
                                                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/svg4.svg"
                                                alt="dropdown"
                                            />
                                            <img
                                                onClick={handleRotate}
                                                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform duration-100 hidden dark:block ${isRotated ? 'rotate-180' : ''}`}
                                                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/svg4dark.svg"
                                                alt="dropdown"
                                            />
                                        </div>
                                        <hr className="bg-gray-200 w-full mt-4" />
                                    </div>

                                    <button className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                                        Add to shopping bag
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Section */}
                        <div className="flex justify-center items-center w-full">
                            <div className="w-full sm:w-96 md:w-8/12 lg:w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-28 sm:gap-x-6 sm:gap-y-12 gap-y-12 sm:mt-14 mt-10">
                                <div>
                                    <img
                                        className="dark:hidden"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg2.svg"
                                        alt="drink"
                                    />
                                    <img
                                        className="hidden dark:block"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg2dark.svg"
                                        alt="drink"
                                    />
                                    <p className="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">
                                        Great for drinks
                                    </p>
                                    <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                                        Here are all the great cocktail recipes you should know how to make, from the margarita to the whiskey sour. Cheers!
                                    </p>
                                </div>
                                <div>
                                    <img
                                        className="dark:hidden"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg3.svg"
                                        alt="hardware"
                                    />
                                    <img
                                        className="hidden dark:block"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg3dark.svg"
                                        alt="hardware"
                                    />
                                    <p className="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">
                                        Durable hardware
                                    </p>
                                    <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                                        Product durability is a key aspect of achieving a circular economy. ... Moreover, enhancing the durability of individual hardware components
                                    </p>
                                </div>
                                <div>
                                    <img
                                        className="dark:hidden"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg5.svg"
                                        alt="Eco-friendly"
                                    />
                                    <img
                                        className="hidden dark:block"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg5dark.svg"
                                        alt="Eco-friendly"
                                    />
                                    <p className="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">
                                        Eco-friendly
                                    </p>
                                    <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                                        They re-use, recycle and reduce waste disposal in their lives. They conserve energy and natural resources
                                    </p>
                                </div>
                                <div>
                                    <img
                                        className="dark:hidden"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg6.svg"
                                        alt="Minimal Design"
                                    />
                                    <img
                                        className="hidden dark:block"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg6dark.svg"
                                        alt="Minimal Design"
                                    />
                                    <p className="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">
                                        Minimal Design
                                    </p>
                                    <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                                        Minimalist interior design is very similar to modern interior design and involves using the bare essentials
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default ProductPage;
