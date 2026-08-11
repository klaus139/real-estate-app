//define the routes for the auth routes

import { Router } from "express";

const authRouter = Router();

//define the auth routes
authRouter.post("/register", (req, res) => {
  res.json({ message: "User registered successfully and other things" });
});


export default authRouter;
