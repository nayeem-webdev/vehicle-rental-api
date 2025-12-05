// import { jwt } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // const decoded = jwt.verify(token)
    next();
  };
};

export default auth;
