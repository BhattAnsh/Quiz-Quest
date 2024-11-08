import express from "express";
const authRouter = express.Router();
import {
  activateAccount,
  loginUser,
  loginWithGoogle,
  logoutUser,
  registerUser,
} from "../../controllers/auth.controller";
import { isAuthenticated } from "../../middleware/auth";
authRouter.post("/register", registerUser);
authRouter.post("/activateAccount", activateAccount);
authRouter.post("/login", loginUser);
authRouter.get("/google",loginWithGoogle);
authRouter.post("/logout", isAuthenticated, logoutUser);

export default authRouter;
