import mongoose from "mongoose";

const BookIssueSchema = new mongoose.Schema({
  bookId: String,
  title: String,
  author: String,
  price: String,
  studentId: String,
  studentName: String,
  date: String
});

const BookIssuemodel = mongoose.model("bookissue", BookIssueSchema);
export default BookIssuemodel;
