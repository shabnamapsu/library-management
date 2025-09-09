

import mongoose from "mongoose";

const { Schema } = mongoose;

const BookdtailSchema = new Schema({
 bookId: {
    type: String,
    required: true
  },
    title: {
    type: String,
    required: true
  },
 author: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});



// Create and export the model
const BookdetailsModel = mongoose.model("bookdetail", BookdtailSchema);
export default BookdetailsModel;