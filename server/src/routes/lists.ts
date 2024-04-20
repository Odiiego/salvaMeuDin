import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { addList, updateList } from '../controllers/lists';

export const router = express.Router();

router.post('/:id', isAuthenticated, addList);
router.patch('/:id', isAuthenticated, updateList);
