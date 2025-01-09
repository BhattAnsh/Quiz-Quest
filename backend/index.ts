import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Quiz Quest Backend is running!");
});

// Login/signup API
app.use("/auth", authRoutes);

// Start the Server
const PORT = process.env.PORT || 5000; // Default port is 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
