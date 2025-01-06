import express, { Request, Response } from "express";
import { signup, login, logout } from "../controllers/authController";

const router = express.Router();

// Correctly typed middleware function
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
