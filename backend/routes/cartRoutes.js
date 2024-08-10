import express from 'express';
import { addItemToCart, removeItemFromCart, updateItemQuantity, getCart, getTotal } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);
router.post('/update', updateItemQuantity);
router.get('/', getCart);
router.get('/total', getTotal);

export default router;
