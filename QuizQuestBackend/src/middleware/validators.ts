import { body, param } from "express-validator";

// Validation for creating a question
export const validateCreateQuestion = [
  body("questionText").notEmpty().withMessage("Question text is required."),
  body("type")
    .isIn([
      "short-answer",
      "paragraph",
      "multiple-choice",
      "checkboxes",
      "dropdown",
      "linear-scale",
      "date",
      "time",
      "true-false",
    ])
    .withMessage("Type must be one of the predefined options."),
  body("options").custom((value, { req }) => {
    // Ensure options are provided only for choice-based question types
    if (
      ["multiple-choice", "checkboxes", "dropdown"].includes(req.body.type) &&
      !value
    ) {
      throw new Error("Options are required for choice-based questions.");
    }
    return true; // Validation passed
  }),
  body("correctOptions")
    .optional()
    .isArray()
    .withMessage("Correct options must be an array."),
  body("validation")
    .optional()
    .isObject()
    .withMessage("Validation must be an object."),
  body("mandatory")
    .isBoolean()
    .withMessage("Mandatory must be a boolean value."),
  body("points")
    .isInt({ min: 0 })
    .withMessage("Points must be a non-negative integer."),
];

// Validation for updating a question
export const validateUpdateQuestion = [
  param("questionId").isMongoId().withMessage("Invalid question ID format."),
  body("questionText")
    .optional()
    .notEmpty()
    .withMessage("Question text must not be empty."),
  body("type")
    .optional()
    .isIn([
      "short-answer",
      "paragraph",
      "multiple-choice",
      "checkboxes",
      "dropdown",
      "linear-scale",
      "date",
      "time",
      "true-false",
    ])
    .withMessage("Type must be one of the predefined options."),
  body("options")
    .optional()
    .isObject()
    .withMessage("Options must be an object."),
  body("correctOptions")
    .optional()
    .isArray()
    .withMessage("Correct options must be an array."),
  body("validation")
    .optional()
    .isObject()
    .withMessage("Validation must be an object."),
  body("mandatory")
    .optional()
    .isBoolean()
    .withMessage("Mandatory must be a boolean value."),
  body("points")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Points must be a non-negative integer."),
];

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware to handle validation results
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next(); // Proceed to the next middleware or route handler
};
