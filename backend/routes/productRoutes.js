import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
    productsFiltersController,
    createProductController,
    deleteProductController,
    getProductController,
    getProductsByCategory,
    getSingleProductController,
    updateProductController,
    searchProductsController,
} from '../controllers/productController.js'
import { upload } from '../middlewares/multerMiddleware.js'

const router = express.Router()

//routes
router.post('/create-product', authMiddleware.requireSignin, authMiddleware.isAdmin, upload.single('image'), createProductController)

//get-products
router.get('/get-products', getProductController)

//single product
router.get('/single-product/:slug', getSingleProductController)

//update producty
router.put('/update-product/:pid', authMiddleware.requireSignin, authMiddleware.isAdmin, upload.single('image'), updateProductController)

//delete product
router.delete('/delete-product/:pid', authMiddleware.requireSignin, authMiddleware.isAdmin, deleteProductController)

//Route to get products by category
router.get('/category/:slug', getProductsByCategory)

//product filter
router.post('/filterProducts', productsFiltersController)

//serach products
router.get('/search/:keyword', searchProductsController)


export default router

