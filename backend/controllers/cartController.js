// Add item to cart
const addItemToCart = (req, res) => {
    // Expect the entire product object
    const { product } = req.body;

    // Extract product details
    const productId = product._id;
    const price = product.price;

    if (!productId || price <= 0) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    if (!req.session.cart) {
        req.session.cart = { items: {}, totalItems: 0, productDetails: {} };
    }

    const userCart = req.session.cart;

    if (!userCart.items[productId]) {
        userCart.items[productId] = 0;
    }

    userCart.items[productId] += 1;
    userCart.totalItems += 1;

    // Include product details in the cart
    if (!userCart.productDetails[productId]) {
        userCart.productDetails[productId] = product // Adjust according to your product object structure
    }
    // res.status(200).json({ items: userCart.items, totalItems: userCart.totalItems, productDetails: userCart.productDetails });
    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save session' });
        }
        res.status(200).json({ items: userCart.items, totalItems: userCart.totalItems, productDetails: userCart.productDetails });
    });
}


// Remove item from cart
const removeItemFromCart = (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    if (!req.session.cart || !req.session.cart.items[productId]) {
        return res.status(404).json({ error: 'Cart or item not found' });
    }

    const userCart = req.session.cart;
    const itemQuantity = userCart.items[productId];

    userCart.totalItems -= itemQuantity;
    delete userCart.items[productId];
    delete userCart.productDetails[productId];

    if (userCart.totalItems === 0) {
        delete req.session.cart;
    }

    // res.status(200).json({ totalItems: userCart.totalItems, cartItems: userCart.items });
    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save session' });
        }
        res.status(200).json({ totalItems: userCart.totalItems, cartItems: userCart.items });
    });
};

const updateItemQuantity = (req, res) => {
    const { productId, quantity } = req.body;
    const userCart = req.session.cart;
    if (!userCart || !userCart.items[productId]) {
        return res.status(404).json({ error: 'Cart or item not found' });
    }

    const currentQuantity = userCart.items[productId];
    const newQuantity = currentQuantity + quantity;

    if (newQuantity <= 0) {
        // Remove item from cart
        userCart.totalItems -= currentQuantity;
        delete userCart.items[productId];
        delete userCart.productDetails[productId];
    } else {
        // Update item quantity in cart
        userCart.items[productId] = newQuantity;
        userCart.totalItems += quantity;
    }

    if (userCart.totalItems === 0) {
        delete req.session.cart;
    }

    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save session' });
        }
        res.status(200).json(userCart);
    });
};

// Get cart details
const getCart = (req, res) => {
    console.log('Session:', req.session);
    // if (!req.session.cart) {
    //     return res.status(404).json({ error: 'Cart not found' });
    // }

    const userCart = req.session.cart;
    res.status(200).json(userCart);
};

// Get cart total
const getTotal = (req, res) => {
    const userCart = req.session.cart;

    if (!userCart || userCart.totalItems === 0) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    let totalPrice = 0;

    // Calculate the total price
    for (const productId in userCart.items) {
        const quantity = userCart.items[productId];
        const product = userCart.productDetails[productId];
        totalPrice += quantity * product.price;
    }

    res.status(200).json(totalPrice);
};


export {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getCart,
    getTotal
};
