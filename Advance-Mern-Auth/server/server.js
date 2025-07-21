import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

// config
dotenv.config(); // dotevn
db(); // db connection

const app = express();

// ===== Middleware Configuration =====
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies from the request headers
app.use(cors({ origin: process.env.CLIENT_SERVER, credentials: true })); // Enable Cross-Origin Resource Sharing

// API Endpoint
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runing on ${PORT}`));
