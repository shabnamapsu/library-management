import mongoose from "mongoose";

const BookReturnSchema = new mongoose.Schema({
  bookId: String,
  title: String,
  author: String,
  price: String,
  studentId: String,
  studentName: String,
  date: String
});

const BookReturnModel = mongoose.model("bookreturn", BookReturnSchema);
export default BookReturnModel;
