// User Repository
// it contains all the database operations related to the user model
// essentially, it acts as a bridge between the application and the database, providing an abstraction layer for data access and manipulation.

import User from "../models/user.model.js";
export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};