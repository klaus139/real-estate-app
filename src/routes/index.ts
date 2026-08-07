import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    name: "real-estate-api",
    version: "0.1.0",
  });
});

export default router;