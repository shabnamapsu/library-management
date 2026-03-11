import mongoose from "mongoose";

const BookReturnSchemabyid = new mongoose.Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
});

const Searchbookshemabyid = mongoose.model("searchbookid", BookReturnSchemabyid);

export default Searchbookshemabyid;