import { vehicleServices } from "./vehicle.service";
import { Request, Response } from "express";

const addVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.addVehicleIntoDB(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    if (!vehicleId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing vehicleId parameter" });
    }
    const result = await vehicleServices.updateVehicleInDB(req.body, vehicleId);
    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleID = req.params.vehicleId;
  try {
    if (!vehicleID) {
      return res
        .status(400)
        .json({ success: false, message: "Missing vehicleID parameter" });
    }
    const result = await vehicleServices.deleteVehicleFromDB(vehicleID);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehiclesFromDB();
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: result.rows,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    if (!vehicleId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing vehicleId parameter" });
    }

    const result = await vehicleServices.getSingleVehicleFromDB(vehicleId);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const vehicleController = {
  addVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
