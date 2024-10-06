import { Request, Response, NextFunction } from "express";
import { Quiz } from "../models/quiz.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

export const quizAuthorization = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.query.id as string;
      const quiz_id = req.query.quiz_id as string;

      // Fetching the quiz's owner by quiz ID
      const quizOwner = await Quiz.findById(quiz_id).select("createdBy");

      // Checking if the quiz exists
      if (!quizOwner) {
        return next(new ErrorHandler("Quiz not found", 404));
      }

      // Checking if the user is the owner of the quiz
      if (quizOwner.createdBy.toString() === user_id) {
        return next(); // Continue to the next middleware if authorized
      } else {
        return res.status(403).json({
          success: false,
          message: "This quiz is not created by you",
        });
      }
    } catch (err: any) {
      console.error(err);
      next(new ErrorHandler("Internal server error", 500));
    }
  }
);
