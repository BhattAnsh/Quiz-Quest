import express from 'express';
import { signup } from '../../controllers/register.controller.js';
import { login } from '../../controllers/signIn.controller.js';
import { auth } from '../../middlewares/auth.js';
import { test } from '../../controllers/test.js';
import { codeCreation } from '../../controllers/quiz.controller.js';
const userRouter = express.Router();

userRouter.post('/register', signup);
userRouter.post('/login', login);
userRouter.get('/test',auth, codeCreation);

export default userRouter;
