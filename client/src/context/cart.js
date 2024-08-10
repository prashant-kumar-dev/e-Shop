import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the CartContext
const CartContext = createContext();

// CartProvider component
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: {}, totalItems: 0, productDetails: {} });

    // Function to fetch cart data from the server
    const fetchCart = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/cart`, {
                withCredentials: true // Include credentials in the request
            });
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Fetch cart when the component mounts
    useEffect(() => {
        fetchCart();
    }, []);

    // Add item to cart
    const addItemToCart = async (product) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/cart/add`, { product }, {
                withCredentials: true // Include credentials in the request
            });
            setCart(response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    // Remove item from cart
    const removeItemFromCart = async (productId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/cart/remove`, { productId }, {
                withCredentials: true // Include credentials in the request
            });
            // Fetch updated cart data after removing item
            await fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Update item quantity in cart
    const updateItemQuantity = async (productId, quantity) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/cart/update`, { productId, quantity }, {
                withCredentials: true // Include credentials in the request
            });
            console.log(response.data);
            setCart(response.data);

        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    // Get cart total
    const getCartTotal = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/cart/total`, {
                withCredentials: true // Include credentials in the request
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching cart total:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
