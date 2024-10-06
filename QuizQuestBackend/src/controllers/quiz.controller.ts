import { Request, Response, NextFunction } from "express";
import { Quiz, Question, Code } from "../models/quiz.model";
import crypto from "crypto";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
// Helper function to create a random quiz code
const codeCreation = (): string => {
  return crypto.randomBytes(4).toString("hex");
};

// Deletion of related questions for a quiz
export const delQuestion = CatchAsyncError(
  async (id: string, next: NextFunction) => {
    try {
      const quiz = await Quiz.findById(id).select("questions");
      if (quiz) {
        quiz.questions.forEach(async (qId: any) => {
          await Question.findByIdAndDelete(qId);
        });
      }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Deletion of the code associated with a quiz
export const delCode = CatchAsyncError(
  async (id: string, next: NextFunction) => {
    try {
      const quiz = await Quiz.findById(id).select("quizCode");
      if (quiz) {
        await Code.findByIdAndDelete(quiz.quizCode);
      }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Create a quiz
export const createQuiz = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, liveUntil, questions, createdBy } = req.body;

    try {
      const existQuiz = await Quiz.findOne({ name });
      if (existQuiz) {
        return next(
          new ErrorHandler("Quiz already exists with the same name", 400)
        );
      }

      const code = codeCreation();
      const newCode = new Code({ code });
      const quizCode = (await newCode.save())._id;
      const newQuiz = new Quiz({
        name,
        description,
        liveUntil,
        questions,
        createdBy,
        quizCode,
      });

      await newQuiz.save();

      res.status(201).json({
        success: true,
        message: "Quiz Created",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Edit quiz details
export const editQuiz = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const quizId = req.query.q_id as string;

    try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        { name, description },
        { new: true }
      );
      if (!updatedQuiz) {
        return next(new ErrorHandler("Quiz not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Quiz is updated",
        updatedQuiz,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Delete quiz
export const deleteQuiz = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const quizId = req.query.quiz_id as string;

    try {
      await delQuestion(quizId, next);
      await delCode(quizId, next);
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

      if (!deletedQuiz) {
        return next(new ErrorHandler("Quiz doesn't exist", 404));
      }

      res.status(200).json({
        success: true,
        message: "Quiz is deleted successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Add question to quiz
export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { question, options, correctOption } = req.body;
    const quizId = req.query.quiz_id as string;

    try {
      const newQuestion = new Question({ question, options, correctOption });
      const q = (await newQuestion.save()) as any;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return next(new ErrorHandler("Quiz doesn't exist", 404));
      }

      quiz.questions.push(q._id);
      await quiz.save();

      res.status(200).json({
        success: true,
        message: "Added question to quiz",
        questionId: q._id,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Edit question
export const editQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { question, options, correctOption } = req.body;
    const questionId = req.query.question_id as string;

    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        { question, options, correctOption },
        { new: true }
      );
      if (!updatedQuestion) {
        return next(new ErrorHandler("Question not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Question is updated",
        updatedQuestion,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Delete question
export const deleteQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.query.question_id as string;

    try {
      const deletedQuestion = await Question.findByIdAndDelete(questionId);
      if (!deletedQuestion) {
        return next(new ErrorHandler("Question doesn't exist", 404));
      }

      res.status(200).json({
        success: true,
        message: "Question is deleted successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
