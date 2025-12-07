import express, { Request, Response } from "express";
import { initDB } from "./database/db";
import { authRoute } from "./modules/auth/auth.route";
import { userRoute } from "./modules/user/user.route";
import { config } from "./config";
import { vehicleRoute } from "./modules/vehicle/vehicle.route";
import { bookingRoute } from "./modules/booking/booking.route";

// Initialize Express app
const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// Initialize the database
initDB();

// Auth routes
app.use("/api/v1/auth", authRoute);

// User routes
app.use("/api/v1/users", userRoute);

// vehicle routes
app.use("/api/v1/vehicles", vehicleRoute);

// vehicle routes
app.use("/api/v1/bookings", bookingRoute);

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, World!" });
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
