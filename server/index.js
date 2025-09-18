// ✅ FILE: index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Route files
import LoginRoute from "./routing/LoginRoute.js";
import SignupRoute from "./routing/SignupRoute.js";
import StudentRoute from "./routing/StudentRoute.js";
import BookdetailRoute from "./routing/BookdetailRoute.js";
import BookIssueroute from "./routing/BookIssueroute.js";
import BookReturnRoute from "./routing/BookReturnRoute.js";

dotenv.config();

// ✅ Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ✅ API Routes
app.use("/api", SignupRoute);
app.use("/api", LoginRoute);
app.use("/api", StudentRoute);
app.use("/api", BookdetailRoute);
app.use("/api", BookIssueroute);
app.use("/api", BookReturnRoute);

// ✅ Serve frontend (Vite build)
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
