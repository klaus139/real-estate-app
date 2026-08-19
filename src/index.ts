import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.post('/api/auth/register', signup);

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Students: mount routes under /api (properties, users, inquiries, auth, …)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Real estate API listening on http://localhost:${port}`);
});
