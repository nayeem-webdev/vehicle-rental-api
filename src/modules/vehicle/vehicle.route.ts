import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import isAdmin from "../../middleware/isAdmin";
import hasBooking from "../../middleware/hasBooking";

const router = Router();

// Admin Only Routes: Add new vehicle
router.post("/", isAdmin(), vehicleController.addVehicle);
router.put("/:vehicleId", isAdmin(), vehicleController.updateVehicle);

router.delete(
  "/:vehicleId",
  isAdmin(),
  hasBooking(),
  vehicleController.deleteVehicle
);

// Public Routes
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getSingleVehicle);

export const vehicleRoute = router;
