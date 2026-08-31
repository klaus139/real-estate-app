import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/token.service";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: {
        message: "Authentication required",
      },
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    if (typeof payload !== "object" || !payload || !("id" in payload)) {
      return res.status(401).json({
        error: {
          message: "Invalid token",
        },
      });
    }

    req.user = {
      id: String(payload.id),
    };

    next();
  } catch {
    return res.status(401).json({
      error: {
        message: "Invalid or expired token",
      },
    });
  }
};