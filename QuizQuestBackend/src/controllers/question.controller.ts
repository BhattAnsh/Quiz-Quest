import { Request, Response, NextFunction } from "express";
import { Quiz, Question, Code } from "../models/quiz.model";
import crypto from "crypto";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
// Helper function to create a random quiz code
export const codeCreation = (): string => {
  return crypto.randomBytes(4).toString("hex");
};

// API to create a new question (quiz)
export const createQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      questionText,
      type,
      options,
      correctOptions,
      validation,
      mandatory,
      points,
      quizId,
      sectionIndex,
    } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(new ErrorHandler("Quiz not found", 404));
    }
    // Create the new question document
    const newQuestion = await Question.create({
      questionText,
      type,
      options,
      correctOptions,
      validation,
      mandatory,
      points,
      quizId, // Store the reference to the quiz
    });
    // Ensure the section index is valid
    if (sectionIndex < 0 || sectionIndex >= quiz.sections.length) {
      return next(new ErrorHandler("Invalid section index", 400));
    }

    // Update the quiz section with the new question's ID
    quiz.sections[sectionIndex].questions.push(newQuestion._id);
    await quiz.save();
    // Respond with the created question
    res.status(201).json({
      success: true,
      data: newQuestion,
    });
  }
);
// Get a question by ID
export const getQuestionById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return next(new ErrorHandler("Question not found", 404));
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  }
);

// Function to retrieve questions by quiz ID
export const getQuestionsByQuizId = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { quizId } = req.params;

    // Find the quiz and populate its questions
    const quiz = await Quiz.findById(quizId).populate("sections.questions");

    // Check if the quiz exists
    if (!quiz) {
      return next(new ErrorHandler("Quiz not found", 404));
    }

    // Flatten the questions from all sections
    const questions = quiz.sections.flatMap((section) => section.questions);

    // Respond with the retrieved questions
    res.status(200).json({
      success: true,
      data: questions,
    });
  }
);

// Function to update an existing question
export const updateQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params; // Extract question ID from the URL
    const updateData = req.body; // Data to update the question

    // Find the question and update it
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updateData,
      { new: true, runValidators: true } // Return the updated document and validate
    );

    // Check if the question exists
    if (!updatedQuestion) {
      return next(new ErrorHandler("Question not found", 404));
    }

    // Respond with the updated question
    res.status(200).json({
      success: true,
      data: updatedQuestion,
    });
  }
);
// Function to delete a question
export const deleteQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params; // Extract question ID from the URL

    // Find the question and delete it
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    // Check if the question exists
    if (!deletedQuestion) {
      return next(new ErrorHandler("Question not found", 404));
    }

    // Respond with a success message
    res.status(204).json({
      success: true,
      message: "Question deleted successfully",
    });
  }
);
// Get all questions
export const getAllQuestions = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const questions = await Question.find();

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  }
);
// Duplicate a question
export const duplicateQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const questionToDuplicate = await Question.findById(id);

    if (!questionToDuplicate) {
      return next(new ErrorHandler("Question not found", 404));
    }

    const newQuestion = new Question({
      ...questionToDuplicate.toObject(),
      _id: undefined, // Clear the ID to create a new document
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      data: newQuestion,
    });
  }
);

// export const delQuestion = delCode = editQuiz =  deleteQuiz = addQuestion = editQuestion =  deleteQuestion =
