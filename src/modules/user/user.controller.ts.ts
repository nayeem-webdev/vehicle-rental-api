import { Request, Response } from "express";
import { userServices } from "./user.service";

// Get all users controller
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

// Update user controller
const updateUser = async (req: Request, res: Response) => {
  console.log("hit");
  const userId = req.params.userId;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId parameter",
      });
    }

    const result = await userServices.updateUserInDB(req.body, userId);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: error,
    });
  }
};

// Delete user controller
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId parameter" });
    }
    const result = await userServices.deleteUserFromDB(userId);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

export const userController = {
  getAllUsers,
  deleteUser,
  updateUser,
};
