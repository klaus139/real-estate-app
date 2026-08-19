// User Repository
// it contains all the database operations related to the user model
// essentially, it acts as a bridge between the application and the database, providing an abstraction layer for data access and manipulation.

import User from "../models/user.model.js";
// Find user by Email
export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};
// Get all users
export const findAllUsers = async () => {
  return User.find();
};
// Find one user by ID
export const findUserById = async (id: string) => {
  return User.findById(id);
};