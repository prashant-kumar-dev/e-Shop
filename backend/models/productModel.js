import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',  // Reference to the Category model
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String
    }, // Cloudinary image URL
    shipping: {
        type: Boolean,
        default: false, // Default to false for shipping
    }
}, { timestamps: true })

export default mongoose.model('Products', productSchema)