import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";

const isAdmin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    const isAdminRole = decoded.role === "admin";

    if (!isAdminRole) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admins only" });
    }

    next();
  };
};

export default isAdmin;
