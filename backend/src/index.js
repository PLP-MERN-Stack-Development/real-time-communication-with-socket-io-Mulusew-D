import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS allowed origins (Add your frontend Render URL)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://real-time-chat-app-fpk1.onrender.com",  // your frontend Render URL
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.send("Chat App Backend is running ✔️");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ❌ Removed frontend serving code

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
