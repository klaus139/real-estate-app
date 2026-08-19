//define the routes for the auth routes
import { Router } from "express";
import { validate } from "../../middleware/validate";
import { registerSchema, loginSchema } from "../../models/auth.schema";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema, "body"),
  (req, res) => {
    res.json({
      message: "Registration data is valid",
      data: req.body,
    });
  }
);

authRouter.post(
  "/login",
  validate(loginSchema, "body"),
  (req, res) => {
    res.json({
      message: "Login data is valid",
      data: req.body,
    });
  }
);

export default authRouter;