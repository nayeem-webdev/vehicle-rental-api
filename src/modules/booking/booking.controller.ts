import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { config } from "../../config";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBookingIntoDB(req.body);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access" });
  }
  const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
  const { role, id } = decoded;
  try {
    const result = await bookingServices.getAllBookingFromDB(role, id);
    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
};
