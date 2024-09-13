import express from 'express';
import { createQuiz, addQuestion} from '../../controllers/quiz.controller.js';
import { auth } from '../../middlewares/auth.js';

const quizRouter = express.Router();

quizRouter.post('/create',auth, createQuiz);
quizRouter.post('/addQuestion', auth, addQuestion);

export default quizRouter;
