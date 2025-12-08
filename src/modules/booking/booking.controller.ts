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
  const customMessage =
    role === "admin"
      ? "Bookings retrieved successfully"
      : "Your bookings retrieved successfully";
  try {
    const result = await bookingServices.getAllBookingFromDB(role, id);
    return res.status(200).json({
      success: true,
      message: customMessage,
      data: result.rows,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access" });
  }
  const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
  const { role, id: customerId } = decoded;
  const isUnauthorized =
    (role === "customer" && req.body.status === "returned") ||
    (role === "admin" && req.body.status === "cancelled");

  if (isUnauthorized) {
    const message =
      role === "customer"
        ? "Unauthorized Access: Only admin can return bookings"
        : "Unauthorized Access: Only customer can cancel bookings";

    return res.status(401).json({ success: false, message });
  }
  const customMessage =
    role === "admin"
      ? "Booking marked as returned. Vehicle is now available"
      : "Booking cancelled successfully";
  const bookingId = Number(req.params.bookingId);
  try {
    const result = await bookingServices.updateBookingInDB(
      role,
      bookingId,
      req.body,
      customerId
    );
    return res.status(200).json({
      success: true,
      message: customMessage,
      data: role === "customer" ? result.rows[0] : result,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
