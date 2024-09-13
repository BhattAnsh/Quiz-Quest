import express from 'express';
import { signup } from '../../controllers/register.controller.js';
import { login } from '../../controllers/signIn.controller.js';
const userRouter = express.Router();

userRouter.post('/register', signup);
userRouter.post('/login', login);

export default userRouter;
