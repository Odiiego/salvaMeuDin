import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { createProductController } from '../controllers/products/createProductController';
import { updateProductController } from '../controllers/products/updateProductController';
import { deleteProductController } from '../controllers/products/deleteProductController';

export const router = express.Router();

router.post('/:id', isAuthenticated, createProductController);
router.patch('/:id', isAuthenticated, updateProductController);
router.delete('/:id', isAuthenticated, deleteProductController);
