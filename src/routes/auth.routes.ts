import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.createUser(req, res));

export default router;
