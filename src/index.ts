import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import apiRouter from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});
app.use("/api", apiRouter);

// Students: mount routes under /api (properties, users, inquiries, auth, …)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Real estate API listening on http://localhost:${port}`);
});
