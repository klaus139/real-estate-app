import { Router } from "express";
import { validate } from "../../middleware/validate";
import { registerSchema, loginSchema } from "../../models/auth.schema";

const router = Router();

router.post(
  "/register",
  validate(registerSchema, "body"),
  (req, res) => {
    res.json({
      message: "Registration data is valid",
      data: req.body,
    });
  }
);

router.post(
  "/login",
  validate(loginSchema, "body"),
  (req, res) => {
    res.json({
      message: "Login data is valid",
      data: req.body,
    });
  }
);

export default router;