import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { addProduct, updateProduct } from '../controllers/products';

export const router = express.Router();

router.post('/:id', isAuthenticated, addProduct);
router.patch('/:id', isAuthenticated, updateProduct);
