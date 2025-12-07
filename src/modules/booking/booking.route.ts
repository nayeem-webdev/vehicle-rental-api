import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

// Booking Routes User & Admin
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);

export const bookingRoute = router;
