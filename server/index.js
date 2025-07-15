// ✅ FILE: index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Route files
import LoginRoute from "./routing/LoginRoute.js"
import SignupRoute from "./routing/SignupRoute.js"
import StudentRoute from"./routing/StudentRoute.js"
import  BookdetailRoute from "./routing/BookdetailRoute.js"
import BookIssueroute from "./routing/BookIssueroute.js"
import BookReturnRoute from "./routing/BookReturnRoute.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DBurl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", SignupRoute); // ✅ includes signup route
app.use("/",LoginRoute); // ✅ includes login route
app.use("/",StudentRoute ); 
app.use("/",BookdetailRoute ); 
app.use("/",BookIssueroute);
app.use("/",BookReturnRoute );
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
