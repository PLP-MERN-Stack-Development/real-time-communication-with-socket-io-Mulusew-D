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

// Use environment PORT or default to 5000
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
// Allow localhost for dev and your frontend Vercel URL for production
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://real-time-chat-app-two-beta.vercel.app", // your frontend deployed URL
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Health check route (Fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Chat App Backend is running ✔️");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server and connect to DB
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
