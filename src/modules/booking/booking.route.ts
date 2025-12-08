import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

// Booking Routes User & Admin
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingRoute = router;
