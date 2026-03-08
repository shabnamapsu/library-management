// 🔍 Search Return Book By bookId
export const searchReturnBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await BookReturnModel.findOne({ bookId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};