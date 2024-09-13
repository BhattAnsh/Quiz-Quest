import express from 'express';
import { createQuiz, addQuestion, editQuiz, deleteQuiz} from '../../controllers/quiz.controller.js';
import { auth } from '../../middlewares/auth.js';

const quizRouter = express.Router();

quizRouter.post('/create',auth, createQuiz);
quizRouter.post('/addQuestion', auth, addQuestion);
quizRouter.put('/editQuiz', auth, editQuiz);
quizRouter.delete('/deleteQuiz', auth, deleteQuiz);

export default quizRouter;
