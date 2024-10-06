import express from "express";
const userRouter = express.Router();
import { isAuthenticated } from "../../middleware/auth";
import {
  updatePassword,
  updateUserInfo,
} from "../../controllers/user.controller";
userRouter.post("/updateUserInfo", isAuthenticated, updateUserInfo);
userRouter.post("/updateUserPassword", isAuthenticated, updatePassword);

export default userRouter;
