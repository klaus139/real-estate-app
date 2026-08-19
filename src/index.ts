import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use ("/api/users", userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// import dotenv from "dotenv";
// import cors from "cors";
// import express from "express";

// dotenv.config();

// const app = express();
// const port = Number(process.env.PORT) || 4000;

// app.use(cors({
//   credentials: true
// }));
// app.use(express.json());

// app.get("/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// // Students: mount routes under /api (properties, users, inquiries, auth, …)

// app.listen(port, () => {
//   console.log(`Real estate API listening on http://localhost:${port}`);
// });
