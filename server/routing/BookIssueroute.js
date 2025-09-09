import express from "express";
import {
  BookIssue,
  getAllIssuedBooks,
  deleteIssuedBook,
  updateIssuedBook
} from "../Controller/BookIssueController.js";

const router = express.Router();

router.post("/bookissue", BookIssue);
router.get("/bookissue", getAllIssuedBooks);
router.delete("/bookissue/:id", deleteIssuedBook);
router.put("/bookissue/:id", updateIssuedBook);

export default router;
