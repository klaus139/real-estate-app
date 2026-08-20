import { Router } from "express";
import { register, verifyEmail } from "../../controllers/authentication/auth.controller";

const authRouter = Router();

// Define the auth routes
authRouter.post("/register", register);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;