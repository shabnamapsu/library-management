import express from "express";
import { Signup } from "../Controller/SignupController.js";

const router = express.Router();

router.post("/signup", Signup);

export default router;