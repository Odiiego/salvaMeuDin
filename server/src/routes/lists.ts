import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { createListController } from '../controllers/lists/createListController';
import { updateListController } from '../controllers/lists/updateListController';
import { deleteListController } from '../controllers/lists/deleteListController';

export const router = express.Router();

router.post('/:id', isAuthenticated, createListController);
router.patch('/:id', isAuthenticated, updateListController);
router.delete('/:id', isAuthenticated, deleteListController);
