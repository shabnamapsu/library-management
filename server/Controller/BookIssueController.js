import BookIssuemodel from "../models/BookIssuemodel.js";

// 📥 Create or Issue Book
export const BookIssue = async (req, res) => {
  try {
    const { bookId, title, author, price, studentId, studentName, date } = req.body;

    // Validation
    if (!bookId || !title || !author || !price || !studentId || !studentName || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate issue
    const existingBook = await BookIssuemodel.findOne({
      bookId,
      title,
      studentId,
      studentName,
    });

    if (existingBook) {
      return res.status(409).json({ message: "Book already issued to this student" });
    }

    const newIssue = new BookIssuemodel({
      bookId,
      title,
      author,
      price,
      studentId,
      studentName,
      date,
    });

    await newIssue.save();
    res.status(201).json({ message: "Book issued successfully" });

  } catch (err) {
    console.error("Issue error:", err.message);
    res.status(500).json({ error: "Failed to issue book", details: err.message });
  }
};

// 📃 Get All Issued Books
export const getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await BookIssuemodel.find();
    res.status(200).json(issuedBooks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch issued books", error: error.message });
  }
};

// 🗑️ Delete Issued Book
export const deleteIssuedBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookIssuemodel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Issued record not found" });
    }

    res.status(200).json({ message: "Issued record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete record", error: error.message });
  }
};

// ✏️ Update Issued Book
export const updateIssuedBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, price, studentId, studentName, date } = req.body;

    const updated = await BookIssuemodel.findByIdAndUpdate(
      id,
      { title, author, price, studentId, studentName, date },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Issued record not found" });
    }

    res.status(200).json({ message: "Issued record updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update issued record", error: error.message });
  }
};
