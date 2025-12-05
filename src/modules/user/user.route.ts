import { Request, Response, Router } from "express";
import { userController } from "./user.controller.ts";

const router = Router();

router.get("/", userController.getAllUsers);

export const userRoute = router;
