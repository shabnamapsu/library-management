import express from "express";
import { searchReturnBookById } from "../Controller/searchReturnBookById.js";

const router = express.Router();

router.get("/bookreturn/search/:bookId", searchReturnBookById);

export default router;