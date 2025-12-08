import { NextFunction, Request, Response } from "express";
import { pool } from "../database/db";

const hasBooking = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("middlewear hit");

    try {
      const path = req.baseUrl.split("/")[3];

      if (path === "users") {
        console.log("user condition hit");
        const id = req.params.userId;
        console.log(id);

        const result = await pool.query(
          `SELECT COUNT(*) AS count FROM bookings WHERE customer_id = $1`,
          [id]
        );

        const bookingCount = parseInt(result.rows[0].count, 10);

        if (bookingCount > 0) {
          return res.status(400).json({
            error: "Cannot delete user. User has existing bookings.",
          });
        }
      }

      if (path === "vehicles") {
        console.log("vehicle condition hit");

        const id = req.params.vehicleId;

        const result = await pool.query(
          `SELECT COUNT(*) AS count FROM bookings WHERE vehicle_id = $1`,
          [id]
        );

        const bookingCount = parseInt(result.rows[0].count, 10);

        if (bookingCount > 0) {
          return res.status(400).json({
            error: "Cannot delete vehicle. Vehicle has existing bookings.",
          });
        }
      }

      next();
    } catch (error) {
      console.error("Error checking bookings:", error);
      return res.status(500).json({
        error: "Internal server error while checking bookings",
      });
    }
  };
};

export default hasBooking;
