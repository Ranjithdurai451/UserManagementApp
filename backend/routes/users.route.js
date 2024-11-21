import { Router } from 'express';
import {
  getAllUsersController,
  updateUserController,
  getUserController,
  deleteUserController,
} from '../controllers/users.controller.js';

const app = Router();

app.get('/', getAllUsersController);

app.get('/:userId', getUserController);

app.patch('/:userId', updateUserController);

app.delete('/:userId', deleteUserController);

export default app;
