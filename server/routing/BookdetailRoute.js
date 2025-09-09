import express from "express";
import {
  AddBookDetails,
  getAllBooks,
  updateBook,
  deleteBook
} from "../Controller/BookdetailsController.js";

const router = express.Router();

// Create Book
router.post("/bookdetail", AddBookDetails);

// Read All Books
router.get("/bookdetail", getAllBooks);

// Update Book by ID
router.put("/bookdetail/:id", updateBook);

//  Delete Book by ID
router.delete("/bookdetail/:id", deleteBook);

export default router;
