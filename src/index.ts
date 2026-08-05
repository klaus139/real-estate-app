import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Students: mount routes under /api (properties, users, inquiries, auth, …)

app.listen(port, () => {
  console.log(`Real estate API listening on http://localhost:${port}`);
});
