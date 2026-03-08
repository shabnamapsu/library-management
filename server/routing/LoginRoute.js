// server/routing/LoginRoute.js
import express from "express";
import { Login } from "../Controller/LogincController.js";

const router = express.Router();

router.post("/login", Login); // ✅ THIS IS 


export default router;

