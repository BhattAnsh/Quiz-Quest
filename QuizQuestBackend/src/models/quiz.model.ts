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
  _id: mongoose.Types.ObjectId;
  questionText: string;
  type:
    | "short-answer"
    | "paragraph"
    | "multiple-choice"
    | "checkboxes"
    | "dropdown"
    | "date"
    | "true-false"
    | "time";
  options: { label: string; value: string }[]; // Options for choice-based questions
  correctOptions?: string[]; // For quiz questions with correct answers
  validation?: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string; // Regex validation for certain question types
    range?: {
      min?: number;
      max?: number;
    };
  };
  mandatory: boolean;
  points: number; // Points for quiz purposes
  quizId: mongoose.Types.ObjectId; // Reference to the associated quiz
}

// Updated Question Schema
const questionSchema: Schema<IQuestion> = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "short-answer",
      "paragraph",
      "multiple-choice",
      "checkboxes",
      "dropdown",
      "date",
      "time",
    "true-false",
    ],
  },
  options: {
    type: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: function () {
      return (
        this.type === "multiple-choice" ||
        this.type === "checkboxes" ||
        this.type === "dropdown"
      );
    },
  },
  correctOptions: {
    type: [String],
    validate: {
      validator: function (v: string[]) {
        // Ensure each correct option matches the available options
        if (this.options && this.options.length > 0) {
          return v.every((option) =>
            this.options.some((opt) => opt.value === option)
          );
        }
        return true; // Allow empty correctOptions for other types
      },
      message: "Correct options must match the available options.",
    },
    required: function () {
      return (
        this.type === "multiple-choice" ||
        this.type === "checkboxes" ||
        this.type === "dropdown"
      );
    }, // Correct options only required for certain types
  },
  validation: {
    required: { type: Boolean, default: false },
    minLength: { type: Number },
    maxLength: { type: Number },
    pattern: { type: String }, // For regex-based validation
    range: {
      min: { type: Number },
      max: { type: Number },
    },
  },
  mandatory: {
    type: Boolean,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: "Points must be a positive number.",
    },
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});

// Interface for Quiz documet
interface IQuiz extends Document {
  title: string;
  description: string;
  sections: {
    title: string;
    description?: string;
    questions: mongoose.Types.ObjectId[]; // References to Question schema
  }[];
  quizManagers: mongoose.Types.ObjectId[];
  quizCode: string;
  responseLimits: number; // Maximum responses allowed
  toAttempt: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  liveUntil?: Date;
  status: string;
}

// Quiz Schema
const quizSchema: Schema<IQuiz> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sections: [
    {
      title: { type: String, required: true },
      description: { type: String },
      questions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Question", index: true },
      ],
    },
  ],
  quizManagers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      index: true,
    },
  ],

  quizCode: {
    type: String,
    unique: true,
    required: true,
  },
  responseLimits: {
    type: Number,
    default: 1,
  },
  toAttempt: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  liveUntil: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "draft", "completed", "archived", "published"],
    default: "draft",
  },
});

// Export Models
export const Quiz: Model<IQuiz> = mongoose.model("Quiz", quizSchema);
export const Question: Model<IQuestion> = mongoose.model(
  "Question",
  questionSchema
);
export const Code: Model<ICode> = mongoose.model("Code", codeSchema);
