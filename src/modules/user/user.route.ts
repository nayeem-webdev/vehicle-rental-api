import { Request, Response, Router } from "express";
import { userController } from "./user.controller.ts";
import auth from "../../middleware/auth.js";

const router = Router();

router.get("/", auth(), userController.getAllUsers);
router.put("/:userId", auth(), userController.updateUser);
router.delete("/:userId", auth(), userController.deleteUser);

export const userRoute = router;
