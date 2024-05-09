import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { createListController } from '../controllers/lists/createListController';
import { updateListController } from '../controllers/lists/updateListController';
import { deleteListController } from '../controllers/lists/deleteListController';
import { getListController } from '../controllers/lists/getListController';

export const router = express.Router();

router.get('/:id?', isAuthenticated, getListController);
router.post('/:id', isAuthenticated, createListController);
router.patch('/:id', isAuthenticated, updateListController);
router.delete('/:id', isAuthenticated, deleteListController);
