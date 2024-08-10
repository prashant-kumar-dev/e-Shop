import React, { useState, useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import { FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeItemFromCart, updateItemQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);

    const items = cart.items ? Object.keys(cart.items).map(id => ({
        ...cart.productDetails[id],
        quantity: cart.items[id]
    })) : [];

    const handleQuantityChange = (productId, delta) => {
        updateItemQuantity(productId, delta);
    };

    const handleRemove = (productId) => {
        removeItemFromCart(productId);
    };

    // Fetch the total asynchronously
    const calculateTotal = async () => {
        const total = await getCartTotal();
        setTotal(total);
    };

    useEffect(() => {
        calculateTotal();
    }, [cart]);

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen p-4 md:p-8">
                {!cart ? (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                        <img src="/images/emptyCart.jpeg" alt="Empty Cart" />
                        <h2 className="text-2xl font-bold mt-4">Your cart is empty</h2>
                        <p className="text-gray-600 mt-2">Add some items to your cart to get started!</p>
                    </div>

                ) : (
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
                        <div className="flex-grow p-6 border-b md:border-r md:border-b-0">
                            <h1 className="text-3xl font-bold pb-6 border-b">Shopping Cart</h1>
                            <div className="py-6">
                                {items.map(item => (
                                    <div key={item._id} className="flex flex-col md:flex-row items-center border-b py-6">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md shadow-md mb-4 md:mb-0" />
                                        <div className="ml-0 md:ml-6 flex-1 text-center md:text-left">
                                            <h2 className="text-2xl font-semibold">{item.name}</h2>
                                            <p className="text-lg text-gray-800 mt-2">₹{(item.price || 0).toFixed(2)}</p>
                                            <div className="flex items-center justify-center md:justify-start mt-4">
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-l"
                                                    onClick={() => handleQuantityChange(item._id, -1)}
                                                    disabled={item.quantity === 1}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2 border px-3 py-1 rounded">{item.quantity}</span>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-r"
                                                    onClick={() => handleQuantityChange(item._id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
                                            <p className="text-xl font-semibold">₹{((item.price || 0) * item.quantity).toFixed(2)}</p>
                                            <button
                                                onClick={() => handleRemove(item._id)}
                                                className="mt-2 text-red-500 hover:underline flex items-center"
                                            >
                                                <FaTrashAlt className="mr-1" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 p-6">
                            <div className="bg-gray-100 p-4 rounded mb-6">
                                <div className="flex justify-between text-lg">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between text-lg mt-2">
                                    <span>Estimated Shipping</span>
                                    <span>₹5.00</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold mt-4">
                                    <span>Total</span>
                                    <span>₹{(parseFloat(total) + 5).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded mb-6">
                                <input
                                    type="text"
                                    placeholder="Discount Code"
                                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                                />
                                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">Apply</button>
                            </div>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 text-xl"
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CartPage;
