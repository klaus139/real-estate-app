import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "../src/db/db.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { registerUser } from "./services/authentication/auth.service.js";
import { signup } from "./controllers/user.controller.js";
import userRoutes from "./routes/user.routes.js";


const app = express();

connectDb ();

dotenv.config();

const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.post('/api/auth/register', signup);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

//User Registration Endpoint 
app.use(errorHandler)

// Students: mount routes under /api (properties, users, inquiries, auth, …)

app.listen(port, () => {
  console.log(`Real estate API listening on http://localhost:${port}`);
});

