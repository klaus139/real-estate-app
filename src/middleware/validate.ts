import { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";
import { registerSchema, loginSchema } from "../models/auth.schema";

export const validate = (
  schema: ZodType,
  source: "body" | "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation failed",
          fields: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
    }

    req[source] = result.data;
    next();
  };
};
