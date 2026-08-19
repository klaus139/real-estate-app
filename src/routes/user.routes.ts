import express from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";
const router = express.Router();
// Get all users
router.get("/", getUsers);
// Get one user
router.get("/:id", getUserById);
export default router;
