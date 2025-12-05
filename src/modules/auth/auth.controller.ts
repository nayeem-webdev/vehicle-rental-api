import { authServices } from "./auth.service";
import { Request, Response } from "express";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signupUserIntoDB(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDB(
      req.body.email,
      req.body.password
    );

    delete result.user.rows[0].password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: result.token,
        user: result.user.rows[0],
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const authController = {
  loginUser,
  signupUser,
};
