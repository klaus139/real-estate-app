// controller for the authentication routes

import { Request, Response } from "express";

import { AuthenticatedRequest } from "../../middleware/auth";
import { DefaultAuthService } from "../../services/authentication/implementation/default-auth-service";

const authService = new DefaultAuthService();

export const registerUser = (req: Request, res: Response) => {
  try {
    // register logic will go here
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const user = await authService.GetUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Failed to get current user",
      },
    });
  }
};