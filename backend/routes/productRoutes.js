import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { createProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'
import { upload } from '../middlewares/multerMiddleware.js'

const router = express.Router()

//routes
router.post('/create-product', authMiddleware.requireSignin, authMiddleware.isAdmin, upload.single('image'), createProductController)

export default router

