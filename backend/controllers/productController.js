import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import { uploadOnCloudinary } from "../helpers/cloudinary.js";
import { promises as fsPromises } from 'fs';
import exp from "constants";

const { readFile, unlink } = fsPromises;

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        const imageFile = req.file;

        // Basic validation
        if (!name || !description || !price || !quantity || !shipping) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
        }
        // Ensure category is provided and valid
        if (!category) {
            return res.status(400).send({ success: false, message: 'Category is required' });
        }
        let imageUrl = '';
        if (imageFile) {
            const uploadResult = await uploadOnCloudinary(imageFile.path); // Corrected function name
            imageUrl = uploadResult.url;
            await unlink(imageFile.path); // Delete the temporary file after upload
        }

        const slug = slugify(name); // Generate slug from product name
        const productData = { name, slug, description, price, category, quantity, shipping, image: imageUrl };

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in Product creation'
        });
    }
};
//get products
export const getProductController = async (req, res) => {
    const { limit = 4, offset = 0 } = req.query; // Default limit to 10, offset to 0
    try {
        const totalCount = await productModel.countDocuments();
        const products = await productModel
            .find({})
            .populate('category')
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            totalCount,
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        console.error("Error in getting products:", error.message);
        res.status(500).send({
            success: false,
            error: "Error fetching products",
            message: error.message
        });
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .populate('category')
        res.status(200).send({
            success: true,
            message: "Single Product fetched successfully",
            product,
        });
    } catch (error) {
        console.error("Error in getting product:", error.message);
        res.status(500).send({
            success: false,
            error: "Error fetching product",
            message: error.message
        });
    }
}

//update product

export const updateProductController = async (req, res) => {
    try {
        const productId = req.params.pid;
        const { name, description, price, category, quantity, shipping } = req.body;
        const imageFile = req.file;
        // console.log(req.body)

        // Check if productId is provided
        if (!productId) {
            return res.status(400).send({ success: false, message: 'Product ID is required' });
        }

        // Basic validation
        if (!name || !description || !price || !quantity || !shipping) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
        }
        // Ensure category is provided and valid
        if (!category) {
            return res.status(400).send({ success: false, message: 'Category is required' });
        }
        let imageUrl = '';
        if (imageFile) {
            const uploadResult = await uploadOnCloudinary(imageFile.path); // Corrected function name
            imageUrl = uploadResult.url;
            await unlink(imageFile.path); // Delete the temporary file after upload
        }

        const slug = slugify(name); // Generate slug from product name
        const updateFields = { name, slug, description, price, category, quantity, shipping };

        if (imageUrl) updateFields.image = imageUrl; // Update image only if uploaded

        // Find the product by ID and update it
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updateFields, {
            new: true, // Return the updated document
            runValidators: true // Run validators (such as required fields) on update
        });

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }


        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in updating product'
        });
    }
};



//delete product
export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params
        await productModel.findByIdAndDelete(pid)
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully!',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting product"
        })
    }
}

// Controller function to get products by category ID
export const getProductsByCategory = async (req, res) => {
    try {
        const slug = req.params.slug;
        const { page = 1, limit = 5 } = req.query; // Default to page 1 and limit 5 if not provided

        const category = await categoryModel.findOne({ slug }).lean();
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const totalProducts = await productModel.countDocuments({ category: category._id });
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await productModel.find({ category: category._id })
            .populate('category')
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        res.status(200).send({
            success: true,
            message: 'Products fetched successfully',
            products,
            totalPages,
            currentPage: page
        });
    } catch (err) {
        console.error("Error fetching products by category:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to extract min and max prices from a price range string
const getPriceFromRange = (range) => {
    let min, max;
    if (range.includes('+')) {
        min = parseFloat(range.replace('₹', '').replace('+', ''));
        max = Number.POSITIVE_INFINITY; // Set max value to positive infinity for ranges like ₹1000+
    } else {
        [min, max] = range.split(' - ').map(val => parseFloat(val.replace('₹', '')));
    }
    return { min, max };
};

// Controller function to handle product filters
export const productsFiltersController = async (req, res) => {
    try {
        const { pricerange, category } = req.query;

        // Split pricerange parameter into individual ranges
        const priceranges = pricerange.split(',');
        const query = {};

        if (priceranges && priceranges.length > 0) {
            // Construct MongoDB query for price range
            const priceQueries = priceranges.map(range => {
                const { min, max } = getPriceFromRange(range);
                return { price: { $gte: min, $lte: max } };
            });
            // Combine price queries with $or operator
            query.$or = priceQueries;
        }
        if (category) {
            // Fetch category ID based on category slug
            const categoryData = await categoryModel.findOne({ slug: category });
            if (categoryData) {
                // Add category filter to the query
                query.category = categoryData._id; // Assuming categoryId is the reference field
            }
        }
        // Fetch products based on the constructed query
        const products = await productModel.find(query).populate('category');

        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            products
        });
    } catch (error) {
        // Handle errors
        console.error("Error fetching products", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const searchProductsController = async (req, res) => {
    try {
        const { keyword } = req.params
        const products = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },   // Case insensitive search
                { description: { $regex: keyword, $options: "i" }, }
            ]
        })
        res.status(200).json({
            success: true,
            message: 'products search successfully',
            products
        })

    } catch (error) {
        console.error("Error fetching products searching :", err);
        res.status(404).json(
            {
                success: false,
                message: 'Error in search products',
                error

            });
    }
}




