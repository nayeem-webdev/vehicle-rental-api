import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";

const hasBooking = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    // Has booking check logic can be implemented here
    // if hasBooking false then next
    next();
  };
};

export default hasBooking;
