import express from 'express';
import { createQuiz, addQuestion, editQuiz, deleteQuiz, delQuestion, delCode, editQuestion, deleteQuestion} from '../../controllers/quiz.controller.js';
import { auth } from '../../middlewares/auth.js';
import { authorization } from '../../middlewares/authorization.js';

const quizRouter = express.Router();

quizRouter.post('/create',auth, createQuiz);
quizRouter.post('/addQuestion', auth, authorization, addQuestion);
quizRouter.put('/editQuiz', auth, authorization,editQuiz);
quizRouter.delete('/deleteQuiz', auth, authorization,deleteQuiz);
quizRouter.put('/editQuestion', auth, authorization, editQuestion);
quizRouter.delete('/delQuestion', auth, authorization, deleteQuestion);
quizRouter.get('/test', delCode);

export default quizRouter;
