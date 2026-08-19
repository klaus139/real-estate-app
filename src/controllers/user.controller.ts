import { Request, Response } from "express";
import { findAllUsers, findUserById } from "../repository/user.repository.js";
// Get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await findAllUsers();
  // Do not send passwordHash
  const publicUsers = users.map((user) => {
    const userData = user.toObject();
    delete (userData as any).passwordHash;
    return userData;
  });
  res.status(200).json(publicUsers);
};
// Get one user by ID
export const getUserById = async (req: Request, res: Response) => {
  const user = await findUserById(req.params.id);
  // User does not exist
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
  // Do not send passwordHash
  const userData = user.toObject();
  delete (userData as any).passwordHash;
  res.status(200).json(userData);
};
