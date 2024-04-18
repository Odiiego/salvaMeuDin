import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export const router = express.Router();

router.get('', isAuthenticated, getAllUsers);
router.delete('/:id', isAuthenticated, isOwner, deleteUser);
router.patch('/:id', isAuthenticated, isOwner, updateUser);
