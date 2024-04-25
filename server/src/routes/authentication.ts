import express from 'express';
import { createUserController } from '../controllers/authentication/createUserController';
import { loginController } from '../controllers/authentication/loginController';

export const router = express.Router();

router.post('/register', createUserController);
router.post('/login', loginController);
