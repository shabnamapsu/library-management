import Searchstudentbyidshema from "../models/Searchstudentbyidshema.js";

export const searchStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Searchstudentbyidshema.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};