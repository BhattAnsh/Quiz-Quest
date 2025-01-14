import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from 'bcryptjs'
import {upload_on_cloudinary} from '../utils/cloudinary'

interface MulterRequest extends Request {
  file: any;
}

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized, no token provided" });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // Fetch the user profile, excluding the password field
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User profile fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Edit profile controller
export const editProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized, no token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const { username, email, password } = req.body;

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (username) user.username = username;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    if ((req as MulterRequest).file) {
      const uploaded_url = await upload_on_cloudinary((req as MulterRequest).file.buffer);
      console.log("Uploaded URL:", uploaded_url);
      if (typeof uploaded_url === "string" && uploaded_url) {
        user.picture = uploaded_url;
      } else {
        console.error("Invalid URL returned from Cloudinary:", uploaded_url);
      }
    }

    console.log("Updated Picture URL:", user.picture); // Check the value before saving
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const quizStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized, no token provided" });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // Fetch the user profile, excluding the password field
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const participatedQuizes = user.liveQuizzes || [];
    const completedQuizes = user.previousQuizzes || [];

    console.log("Participated Quizzes:", participatedQuizes);
    console.log("Completed Quizzes:", completedQuizes);

    // Return the quiz status to the client
    res.status(200).json({
      message: "Quiz status retrieved successfully",
      participatedQuizes,
      completedQuizes,
    });

  } catch (error) {
    console.error("Error fetching quiz status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
