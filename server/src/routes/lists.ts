import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { addList } from '../controllers/lists';

export const router = express.Router();

router.post('/:id', isAuthenticated, isOwner, addList);
