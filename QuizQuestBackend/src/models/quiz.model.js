import mongoose, { mongo } from "mongoose";

const codeSchmea =  new mongoose.Schema({
  code:{
    type:String,
    required:true,
  }
})
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
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question", default:[] }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required:true}],
  quizCode:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Code",
    required:true
  }]
});

export const Quiz = mongoose.model("Quiz", quizSchema);
export const Question = mongoose.model("Question", questionSchema);
export const Code = mongoose.model("Code", codeSchmea);