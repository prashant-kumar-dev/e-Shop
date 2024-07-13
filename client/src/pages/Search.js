import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values] = useSearch()
    console.log(values)

    const handleAddToCart = (productId) => {
        // Add to cart functionality here
        console.log('Add to Cart:', productId)
    }

    const productCount = values.results.products ? values.results.products.length : 0;

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Search Results</h1>
                    <p className="text-gray-600">{productCount} products found</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    {productCount > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {values.results.products.map((product) => (
                                <div key={product.id} className="relative overflow-hidden bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                    <div className="aspect-w-3 aspect-h-4 bg-gray-200 hover:bg-gray-300 transition duration-300">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover object-center w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-700 mb-2">{product.color}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-gray-900">₹ {product.price}</p>
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                className="flex-shrink-0 ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No results found.</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Search
