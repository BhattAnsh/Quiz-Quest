import mongoose, { mongo } from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: Map,
    of:String,
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
});

const quizSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  liveUntil: {
    type: Date,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  questions: {
    type: [questionSchema],
    default:[],
  },
  createdBy: {
    type: String,
    required: true,
  },
});

export const Quiz = mongoose.model("Quiz", quizSchema);
