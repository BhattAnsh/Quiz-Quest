import express from "express";
import { isAuthenticated } from "../../middleware/auth.ts";
import { quizAuthorization } from "../../middleware/quizAuth.ts";

import {
  createQuestion,
  deleteQuestion,
  getQuestionsByQuizId,
  updateQuestion,
} from "../../controllers/question.controller.ts";
import {
  validateCreateQuestion,
  validateRequest,
  validateUpdateQuestion,
} from "../../middleware/validators.ts";

const questionRouter = express.Router();

questionRouter.post(
  "/createQuestion",
  validateCreateQuestion,
  validateRequest,
  createQuestion
);
questionRouter.get("/quizzes/:quizId/", getQuestionsByQuizId);
questionRouter.put(
  "/updateQuestion/:questionId",
  validateUpdateQuestion,
  validateRequest,
  updateQuestion
);
questionRouter.delete("/deleteQuestion/:questionId", deleteQuestion);
// quizRouter.get("/test", delCode);

export default questionRouter;
