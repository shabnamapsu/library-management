// ✅ FILE: routing/SignupRoute.js
import express from "express";
import { Signup } from "../Controller/SignupController.js"; // ✅ correct path

const router = express.Router();

router.post("/signup", Signup); // ✅ calls controller function

export default router;
