import { Router } from "express";
import { bookingController } from "./booking.controller";
import isAdminOrCustomer from "../../middleware/isAdminOrCustomer";

const router = Router();

// Booking Routes User & Admin
router.post("/", isAdminOrCustomer(), bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingRoute = router;
