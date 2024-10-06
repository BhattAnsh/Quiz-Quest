import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for Code document
interface ICode extends Document {
  code: string;
}

// Code Schema
const codeSchema: Schema<ICode> = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

// Interface for Question document
interface IQuestion extends Document {
  question: string;
  options: Map<string, string>;
  correctOption: string;
}

// Question Schema
const questionSchema: Schema<IQuestion> = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Map,
    of: String,
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
});

// Interface for Quiz document
interface IQuiz extends Document {
  name: string;
  description: string;
  liveUntil: Date;
  createdOn: Date;
  questions: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  quizCode: mongoose.Types.ObjectId[];
}

// Quiz Schema
const quizSchema: Schema<IQuiz> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  liveUntil: {
    type: Date, // Date type for proper date handling
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question", default: [] },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizCode: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Code", required: true },
  ],
});

// Export Models
export const Quiz: Model<IQuiz> = mongoose.model("Quiz", quizSchema);
export const Question: Model<IQuestion> = mongoose.model(
  "Question",
  questionSchema
);
export const Code: Model<ICode> = mongoose.model("Code", codeSchema);
