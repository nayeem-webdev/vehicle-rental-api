import express, { Request, Response } from "express";
import { initDB } from "./database/db";
import { authRoute } from "./modules/auth/auth.route";
import { userRoute } from "./modules/user/user.route";
import { config } from "./config";

// Initialize Express app
const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// Initialize the database
initDB();

// signup new user
app.use("/api/v1/auth", authRoute);

// get all users
app.use("/api/v1/users", userRoute);

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, World!" });
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
