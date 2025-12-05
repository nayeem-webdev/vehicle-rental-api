import { Request, Response, Router } from "express";
import { userController } from "./user.controller.ts";
import auth from "../../middleware/auth.js";

const router = Router();

router.get("/", auth(), userController.getAllUsers);

export const userRoute = router;
