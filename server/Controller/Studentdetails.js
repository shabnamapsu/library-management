import StudentinfoModel from "../models/Studentinfomodel.js";

// 📄 Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentinfoModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};

// 🗑️ Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const result = await StudentinfoModel.deleteOne({ _id: studentId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student", error: error.message });
  }
};

// ➕ Add New Student
export const Studentinfo = async (req, res) => {
  try {
    const { studentId, stuName, birthdate, gender, course, address } = req.body;

    if (!studentId?.trim() || !stuName?.trim() || !birthdate || !gender || !course?.trim() || !address?.trim()) {
      return res.status(400).json({ message: "All fields are required and cannot be empty" });
    }

    const existingUser = await StudentinfoModel.findOne({ studentId, stuName });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new StudentinfoModel({
      studentId,
      stuName,
      birthdate,
      gender,
      course,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};

// ✏️ Update Student
export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { stuName, birthdate, gender, course, address } = req.body;

    const updatedStudent = await StudentinfoModel.findByIdAndUpdate(
      studentId,
      { stuName, birthdate, gender, course, address },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Failed to update student", error: error.message });
  }
};
