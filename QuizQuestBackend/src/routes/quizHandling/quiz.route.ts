import express from "express";
import {
  createNewQuizForm,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  publishQuiz,
} from "../../controllers/quiz.controller";
import { quizAuthorization } from "../../middleware/quizAuth";

const quizRouter = express.Router();

quizRouter.post("/createQuiz", quizAuthorization, createNewQuizForm);
quizRouter.get("/getAllQuizzes", getAllQuizzes);
quizRouter.get("/getQuiz/:id", getQuizById);
quizRouter.put("/updateQuiz/:id", updateQuiz);
quizRouter.delete("/deleteQuiz/:id", deleteQuiz);
quizRouter.post("/publish/:quizId", publishQuiz);

export default quizRouter;
