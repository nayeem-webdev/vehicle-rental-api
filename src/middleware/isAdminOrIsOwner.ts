import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";

const isAdminOrIsOwner = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      if (id === decoded.id || decoded.role === "admin") {
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Not authorized to access this resource.",
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token.",
        error: error,
      });
    }
  };
};

export default isAdminOrIsOwner;
