import { Router } from 'express';

import {
  getAllUsers,
  getUserbyId,
  createNewUser,
  deleteUser,
  authenticateUser
} from '../controller/user_controller';

import { verifyUser } from '../middleware/user';

export const userRouter: Router = Router();

userRouter.get('/users',  verifyUser, getAllUsers);
userRouter.get('/users/:id',  verifyUser, getUserbyId);
userRouter.post('/users/register', createNewUser);
userRouter.post('/users/login', authenticateUser);
userRouter.delete('/users', verifyUser, deleteUser);