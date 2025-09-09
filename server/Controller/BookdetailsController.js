import BookdetailsModel from "../models/Bookdetailsmodel.js";

// 📥 Create Book Entry
export const AddBookDetails = async (req, res) => {
  try {
    const {
      bookId,
      title,
      author,
      price,
      studentId,
      studentName,
      date
    } = req.body;

    // ✅ Validation
   if (!bookId.trim() || !title.trim() || !author.trim() || !price.trim()) {
  toast.error("Please fill all the details.");
  return;
}


    // ✅ Check for existing entry
    const existingBook = await BookdetailsModel.findOne({ bookId, title, studentName });
    if (existingBook) {
      return res.status(409).json({ message: "Book already exists" });
    }

    // ✅ Create new entry
    const newBook = new BookdetailsModel({
      bookId,
      title,
      author,
      price,
      studentId,
      studentName,
      date
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });

  } catch (err) {
    console.error("Bookdetails error:", err.message);
    res.status(500).json({ error: "Book save failed", details: err.message });
  }
};

// 📋 Get All Book Records
export const getAllBooks = async (req, res) => {
  try {
    const books = await BookdetailsModel.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books", error: err.message });
  }
};

// 🗑️ Delete Book by ID
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const result = await BookdetailsModel.deleteOne({ _id: bookId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

// ✏️ Update Book by ID
export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, price } = req.body;

    const updatedBook = await BookdetailsModel.findByIdAndUpdate(
      bookId,
      { title, author, price },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};
