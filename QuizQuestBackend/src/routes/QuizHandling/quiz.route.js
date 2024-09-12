import express from 'express';
import { createQuiz } from '../../controllers/quiz.controller.js';
import { auth } from '../../middlewares/auth.js';

const quizRouter = express.Router();

quizRouter.post('/create',auth, createQuiz);

export default quizRouter;
