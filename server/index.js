import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import LoginRoute from "./routing/LoginRoute.js";
import SignupRoute from "./routing/SignupRoute.js";
import StudentRoute from "./routing/StudentRoute.js";
import BookdetailRoute from "./routing/BookdetailRoute.js";
import BookIssueroute from "./routing/BookIssueroute.js";
import BookReturnRoute from "./routing/BookReturnRoute.js";
import Searchbookbyid from "./routing/Searchbookbyid.js";
import Searchstudentbyid from "./routing/Searchstudentbyid.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// API routes
app.use("/api", SignupRoute);
app.use("/api", LoginRoute);
app.use("/api", StudentRoute);
app.use("/api", BookdetailRoute);
app.use("/api", BookIssueroute);
app.use("/api", BookReturnRoute);
app.use("/api", Searchbookbyid);
app.use("/api", Searchstudentbyid);

// Serve frontend
// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// fallback route
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});