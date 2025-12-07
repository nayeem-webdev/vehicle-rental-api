import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

// Booking Routes User & Admin
router.post("/", bookingController.createBooking);

export const bookingRoute = router;
