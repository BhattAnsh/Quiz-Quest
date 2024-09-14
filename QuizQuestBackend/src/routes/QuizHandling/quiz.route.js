import express from 'express';
import { createQuiz, addQuestion, editQuiz, deleteQuiz, delQuestion, delCode, editQuestion, deleteQuestion} from '../../controllers/quiz.controller.js';
import { auth } from '../../middlewares/auth.js';

const quizRouter = express.Router();

quizRouter.post('/create',auth, createQuiz);
quizRouter.post('/addQuestion', auth, addQuestion);
quizRouter.put('/editQuiz', auth, editQuiz);
quizRouter.delete('/deleteQuiz', auth, deleteQuiz);
quizRouter.put('/editQuestion', auth, editQuestion);
quizRouter.delete('/delQuestion', auth, deleteQuestion);
quizRouter.get('/test', delCode);

export default quizRouter;
