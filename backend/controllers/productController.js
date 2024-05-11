import slugify from "slugify";
import productModel from "../models/productModel.js";
import { uploadOnCloudinary } from "../helpers/cloudinary.js";
import { promises as fsPromises } from 'fs';

const { readFile, unlink } = fsPromises;

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        const imageFile = req.file;

        // Basic validation
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
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
    const { limit = 10, offset = 0 } = req.query; // Default limit to 10, offset to 0
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
        console.log(req.body)

        // Check if productId is provided
        if (!productId) {
            return res.status(400).send({ success: false, message: 'Product ID is required' });
        }

        // Basic validation
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
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
