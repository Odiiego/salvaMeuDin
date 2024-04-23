import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { addProduct } from '../controllers/products';

export const router = express.Router();

router.post('/:id', isAuthenticated, addProduct);
