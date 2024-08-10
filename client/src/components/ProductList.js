import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import CommonSpinner from './CommonSpinner';
import { useCart } from '../context/cart';

const ProductList = ({ category, filters, page, setTotalPages }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addItemToCart } = useCart();

    const fetchProducts = async (page = 1, append = false) => {
        setLoading(true);
        try {
            let url = `${process.env.REACT_APP_API_URL}/api/v1/product/get-products`;
            if (category) {
                url = `${process.env.REACT_APP_API_URL}/api/v1/product/category/${category.slug}?page=${page}&limit=4`;
            }
            const response = await axios.get(url);
            const data = response.data;

            if (append) {
                setProducts((prevProducts) => [...prevProducts, ...data.products]);
            } else {
                setProducts(data.products);
            }
            if (data.totalPages) {
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            setError('Error fetching products');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page, page > 1);
        // eslint-disable-next-line
    }, [category, page]);

    useEffect(() => {
        const filterProducts = async () => {
            try {
                // Function to check if all filters are empty
                const areAllFiltersEmpty = () => {
                    for (const key in filters) {
                        if (filters.hasOwnProperty(key) && filters[key].length !== 0) {
                            return false; // If any filter is not empty, return false
                        }
                    }
                    return true; // If all filters are empty, return true
                };

                // Usage
                if (areAllFiltersEmpty()) {
                    fetchProducts(); // Fetch products if all filters are empty
                    return;
                }

                let url = `${process.env.REACT_APP_API_URL}/api/v1/product/filterProducts?${new URLSearchParams(filters).toString()}`;
                if (category && category.slug) {
                    url += `&category=${category.slug}`;
                }
                const response = await axios.post(url);
                // console.log(response)
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error
                return { error: 'Error fetching products' };
            }
        };
        filterProducts()
        // eslint-disable-next-line
    }, [filters])

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {loading ? (
                    <CommonSpinner />
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="relative overflow-hidden bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <Link to={`/products/${product.slug}`}>
                                <div className="aspect-w-3 aspect-h-4 bg-gray-200 hover:bg-gray-300 transition duration-300">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover object-center w-full h-full"
                                    />
                                </div>
                            </Link>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <p className="text-sm text-gray-700 mb-2">{product.color}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold text-gray-900">₹ {product.price}</p>
                                    <button
                                        onClick={() => addItemToCart(product)}
                                        className="flex-shrink-0 ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;