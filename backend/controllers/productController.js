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
