import { Router } from "express";
import { userController } from "./user.controller.ts";
import isAdmin from "../../middleware/isAdmin.js";
import hasBooking from "../../middleware/hasBooking.js";
import isAdminOrIsOwner from "../../middleware/isAdminOrIsOwner.js";

const router = Router();

// Admin Only route
router.get("/", isAdmin(), userController.getAllUsers);

//!! Do not Forget to write hasBooking logic
router.delete("/:userId", isAdmin(), hasBooking(), userController.deleteUser);

// Admin Only Or Owner Only route
router.put("/:userId", isAdminOrIsOwner(), userController.updateUser);

export const userRoute = router;
