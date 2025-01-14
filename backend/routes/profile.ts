import { getProfile, editProfile, quizStatus } from "../controllers/profileController";
import express from 'express'
import multer from "multer";

const router = express.Router()
const upload = multer({storage:multer.memoryStorage()})

router.get("/getprofile",getProfile)

router.post("/editprofile",upload.single('picture'),editProfile)

router.get("/quizStatus",quizStatus)
export default router