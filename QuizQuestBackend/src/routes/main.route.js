import userRouter from './userHandling/register.route.js';
import quizRouter from './QuizHandling/quiz.route.js';
export default function(app){
    app.use('/user', userRouter);
    app.use('/quiz', quizRouter);
}