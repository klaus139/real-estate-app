import express from "express";
import bcrypt from "bcrypt";
import { Router } from "express";
import { AppError } from "../shared/error.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router ();
const authController = new AuthController();

// Route for signing the user up 
router.post("/signup", (req, res) => {
  authController.createUser(req, res);
});

export default router;
