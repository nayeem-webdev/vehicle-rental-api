import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { pool } from "../database/db";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
    `,
      [decoded.email]
    );
    if (!user.rows.length) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // if (user.rows[0].role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Forbidden: Admins only" });
    // }
    next();
  };
};

export default auth;
