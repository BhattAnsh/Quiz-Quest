import express from "express";
import { isAuthenticated } from "../../middleware/auth";
import { quizAuthorization } from "../../middleware/quizAuth.ts";
import {
  addQuestion,
  createQuiz,
  delCode,
  deleteQuestion,
  deleteQuiz,
  editQuestion,
  editQuiz,
} from "../../controllers/quiz.controller.ts";

const quizRouter = express.Router();

quizRouter.post("/create", isAuthenticated, createQuiz);
quizRouter.post("/addQuestion", isAuthenticated, addQuestion);
quizRouter.put("/editQuiz", isAuthenticated, quizAuthorization, editQuiz);
quizRouter.delete(
  "/deleteQuiz",
  isAuthenticated,
  quizAuthorization,
  deleteQuiz
);
quizRouter.put(
  "/editQuestion",
  isAuthenticated,
  quizAuthorization,
  editQuestion
);
quizRouter.delete(
  "/delQuestion",
  isAuthenticated,
  quizAuthorization,
  deleteQuestion
);
quizRouter.get("/test", delCode);

export default quizRouter;
