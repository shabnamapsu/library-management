import express from "express";
import {
  ReturnBook,
  getAllReturnedBooks,
  deleteReturnedBook,
  updateReturnedBook
} from "../Controller/BookReturnController.js";

const router = express.Router();

router.post("/bookreturn", ReturnBook);

router.get("/bookreturn", getAllReturnedBooks);

router.delete("/bookreturn/:id", deleteReturnedBook);

router.put("/bookreturn/:id", updateReturnedBook);

export default router;
