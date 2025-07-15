import BookReturnmodel from "../models/BookReturnmodel.js";

// 📥 Create or Return Book
export const ReturnBook = async (req, res) => {
  try {
    const { bookId, title, author, price, studentId, studentName, date } = req.body;

    // Validation
    if (!bookId || !title || !author || !price || !studentId || !studentName || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate return
    const existingReturn = await BookReturnmodel.findOne({
      bookId,
      studentId,
    });

    if (existingReturn) {
      return res.status(409).json({ message: "Book already returned by this student" });
    }

    const newReturn = new BookReturnmodel({
      bookId,
      title,
      author,
      price,
      studentId,
      studentName,
      date,
    });

    await newReturn.save();
    res.status(201).json({ message: "Book returned successfully" });

  } catch (err) {
    console.error("Return error:", err.message);
    res.status(500).json({ error: "Failed to return book", details: err.message });
  }
};

// 📃 Get All Returned Books
export const getAllReturnedBooks = async (req, res) => {
  try {
    const returnedBooks = await BookReturnmodel.find();
    res.status(200).json(returnedBooks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch returned books", error: error.message });
  }
};

// 🗑️ Delete Returned Book
export const deleteReturnedBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookReturnmodel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Return record not found" });
    }

    res.status(200).json({ message: "Return record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete return record", error: error.message });
  }
};

// ✏️ Update Returned Book
export const updateReturnedBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, price, studentId, studentName, date } = req.body;

    const updated = await BookReturnmodel.findByIdAndUpdate(
      id,
      { title, author, price, studentId, studentName, date },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Return record not found" });
    }

    res.status(200).json({ message: "Return record updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update return record", error: error.message });
  }
};
