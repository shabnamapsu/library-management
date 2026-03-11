import express from "express";
import { searchStudentById } from "../Controller/searchStudentById.js";

const router = express.Router();

router.get("/studentinfo/search/:studentId", searchStudentById);

export default router;