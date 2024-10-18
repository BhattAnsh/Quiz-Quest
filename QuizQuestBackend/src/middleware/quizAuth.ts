import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Quiz } from "../models/quiz.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { redis } from "../config/redis";
import userModel, { IUser } from "../models/user.model";
require("dotenv").config();
export const quizAuthorization = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(
        new ErrorHandler("You must be logged in to create a quiz.", 401)
      );
    }
    console.log("authing");

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    const user = await redis.get(decoded.id);
    if (user) {
      req.user = JSON.parse(user);
    } else return next(new ErrorHandler("User not found.", 404));

    next();
  }
);
