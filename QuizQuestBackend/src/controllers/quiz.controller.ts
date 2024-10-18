import { Request, Response, NextFunction } from "express";
import { Quiz } from "../models/quiz.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { codeCreation } from "./question.controller";

// Create a quiz
export const createNewQuizForm = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, responseLimits, toAttempt } = req.body;

    // Validation for required fields
    if (!title || !description) {
      return next(new ErrorHandler("Title and description are required.", 400));
    }
    // Generate a unique quiz code
    let quizCode;
    do {
      quizCode = codeCreation();
    } while (await Quiz.findOne({ quizCode }));
    const defaultSection = {
      title: "Section 1",
      questions: [],
    };
    const liveUntil = new Date();
    liveUntil.setDate(liveUntil.getDate() + 7); // Adds 7 days

    const quizData = {
      title,
      description,
      sections: [defaultSection],
      quizManagers: [req.user?._id], // You can modify this based on your business logic
      quizCode,
      responseLimits: responseLimits || 1,
      toAttempt: toAttempt || false,
      createdBy: req.user?._id, // Assuming user ID is attached to req
      createdAt: new Date(),
      liveUntil,
      status: "draft", // Default status
    };

    const quiz = await Quiz.create(quizData);

    res.status(201).json({
      success: true,
      data: quiz,
    });
  }
);

// Get all quizzes
export const getAllQuizzes = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const quizzes = await Quiz.find();

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  }
);

// Get a quiz by ID
export const getQuizById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const quiz = await Quiz.findById(id).populate("sections.questions");

    if (!quiz) {
      return next(new ErrorHandler("Quiz not found", 404));
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  }
);

// Delete a quiz
export const deleteQuiz = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return next(new ErrorHandler("Quiz not found", 404));
    }

    res.status(204).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  }
);
// use the complete quiz button on frontend
export const publishQuiz = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { quizId } = req.params;

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return next(new ErrorHandler("Quiz not found.", 404));
    }

    // Ensure the quiz is still in draft status
    if (quiz.status !== "draft") {
      return next(
        new ErrorHandler("Quiz is already published or not in draft.", 400)
      );
    }

    // Validate all sections and questions before publishing (optional)
    // Example: Ensure at least one section and one question exist
    if (!quiz.sections || quiz.sections.length === 0) {
      return next(
        new ErrorHandler(
          "At least one section is required to publish the quiz.",
          400
        )
      );
    }
    quiz.sections.forEach((section: any, index: number) => {
      if (!section.questions || section.questions.length === 0) {
        return next(
          new ErrorHandler(
            `Section ${index + 1} must have at least one question.`,
            400
          )
        );
      }
    });

    // If validation passes, update the status to "published"
    quiz.status = "published";
    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz successfully published.",
    });
  }
);

// Update a quiz
export const updateQuiz = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuiz) {
      return next(new ErrorHandler("Quiz not found", 404));
    }

    res.status(200).json({
      success: true,
      data: updatedQuiz,
    });
  }
);
