import mongoose from "mongoose";

// Code Schema
const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

// Question Schema
const questionSchema = new mongoose.Schema({
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

// Quiz Schema
const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  liveUntil: {
    type: Date, // Changed to Date type for proper date handling
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question", default: [] }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed to single reference
  quizCode: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Code",
    required: true,
  }],
});

// Export Models
export const Quiz = mongoose.model("Quiz", quizSchema);
export const Question = mongoose.model("Question", questionSchema);
export const Code = mongoose.model("Code", codeSchema);
