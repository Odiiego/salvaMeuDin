import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { addList, deleteList, updateList } from '../controllers/lists';

export const router = express.Router();

router.post('/:id', isAuthenticated, addList);
router.patch('/:id', isAuthenticated, updateList);
router.delete('/:id', isAuthenticated, deleteList);
