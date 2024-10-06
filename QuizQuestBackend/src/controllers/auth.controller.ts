import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
// import sendEmail from "../utils/sendMail"; to send an email, you can refer to creating a file in  utils folder and import it here
import cloudinary from "cloudinary";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../config/jwt";

import { redis } from "../config/redis";
require("dotenv").config();
//register
interface IRegistrationBody {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}
export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const existEmail = await userModel.findOne({ email });
      console.log("existEmail:", existEmail);
      if (existEmail) {
        return next(new ErrorHandler("Email already exists", 400));
      }
      const user: IRegistrationBody = {
        username,
        email,
        password,
      };
      // const activationToken = createActivationToken(user as any);

      // const activationCode = activationToken.activationCode;
      const data = { user: { username: user.username }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );
      try {
        //waiting for krish to complete OTP structure to finalise this!
        // await sendEmail({
        //   email: user.email,
        //   subject: "Account Activation",
        //   template: "activation-mail.ejs",
        //   data,
        // });
        // res.status(201).json({
        //   success: true,
        //   message: `Please check your email: ${user.email} to activate your account`,
        //   activationToken: activationToken.token,
        // });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

//Create OTP functionality here, named createActivationToken and it should  return { token, activationCode };
// the token also needs process.env.ACTIVATION_SECRET as Secret, just so that it can be verified if the api calls are legit or not

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activateAccount = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { username, email, password } = newUser.user;
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        return next(new ErrorHandler("Email already exists", 400));
      } else {
        const user = await userModel.create({
          username,
          email,
          password,
        });
      }
      res.status(201).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

// user logins
interface IloginRequest {
  email: string;
  password: string;
}
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as IloginRequest;
      console.log(email, password);
      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId: any = req.user?.id || "";
      await redis.del(userId, (err: any, value: any) => {
        if (err) {
          console.log("is this an error:", err);
        }
        console.log("what value really:", value);
      });
      console.log("anotherRedis", await redis.get(userId));
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
