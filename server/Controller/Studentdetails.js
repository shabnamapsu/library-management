import StudentinfoModel from "../models/Studentinfomodel.js";

// GET ALL
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentinfoModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD STUDENT
export const Studentinfo = async (req, res) => {
  try {
    const { studentId, stuName, birthdate, gender, course, address } = req.body;

    if (!studentId || !stuName || !birthdate || !gender || !course || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await StudentinfoModel.findOne({ studentId });

    if (exist) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const student = new StudentinfoModel(req.body);

    await student.save();

    res.status(201).json({ message: "Student created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteStudent = async (req, res) => {
  try {
    await StudentinfoModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateStudent = async (req, res) => {
  try {

    const updated = await StudentinfoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};