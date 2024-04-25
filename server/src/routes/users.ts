import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { getAllUsersController } from '../controllers/users/getAllUsersController';
import { deleteUserController } from '../controllers/users/deleteUserController';
import { updateUserController } from '../controllers/users/updateUserController';

export const router = express.Router();

router.get('/', isAuthenticated, getAllUsersController);
router.delete('/:id', isAuthenticated, isOwner, deleteUserController);
router.patch('/:id', isAuthenticated, isOwner, updateUserController);
