/** @format */

import express, { Router } from "express";
import { contactUsController } from "../../controllers/contactUsController";

const router: Router = express.Router();

// Define the route with a POST method for `/contact`
router.post("/contact", contactUsController);

export default router;
