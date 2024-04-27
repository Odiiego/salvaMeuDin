import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { createBrandController } from '../controllers/brands/createBrandController';
import { updateBrandController } from '../controllers/brands/updateBrandController';
import { deleteBrandController } from '../controllers/brands/deteleBrandController';

export const router = express.Router();

router.post('/:id', isAuthenticated, createBrandController);
router.patch('/:id', isAuthenticated, updateBrandController);
router.delete('/:id', isAuthenticated, deleteBrandController);
