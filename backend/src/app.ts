import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes"
import { authMiddleware } from "./middlewares/auth.middleware";


dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/v1/auth", authRoutes);
app.use(authMiddleware);
app.use("/api/v1/user", userRoutes);

export default app;
