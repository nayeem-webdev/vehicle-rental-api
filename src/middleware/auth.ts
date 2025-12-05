import { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ID = true; // Placeholder for actual authentication logic
    if (!ID) {
      throw new Error("Not authorized");
    }
    next();
  };
};

export default auth;
