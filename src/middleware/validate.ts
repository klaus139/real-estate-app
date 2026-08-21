import { Request, Response, NextFunction } from "express";
import { Schema } from "../utils/validator";

export const validate = (
  schema: Schema<any>,
  source: "body" | "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation failed",
          fields: result.issues,
        },
      });
    }

    req[source] = result.data;
    next();
  };
};
