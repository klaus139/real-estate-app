import { Router, Request, Response } from "express";
import authRouter from "./auth/auth.routes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    name: "real-estate-api",
    version: "0.1.0",
  });
});

router.use("/api/auth", authRouter);

export default router;