import StudentinfoModel from "../models/Studentinfomodel.js";
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentinfoModel.find(); // sabhi student laa raha hai
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};

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


export const Studentinfo = async (req, res) => {
  try {
    const { studentId, stuName, birthdate, gender } = req.body;

    // ✅ Validation added inside the try block
    if (!studentId?.trim() || !stuName?.trim() || !birthdate || !gender) {
      return res.status(400).json({ message: "All fields are required and cannot be empty" });
    }

    // ✅ Check for existing studentId
    const existingUser = await StudentinfoModel.findOne({ studentId ,stuName});
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // ✅ Save new user
    const newUser = new StudentinfoModel({
      studentId,
      stuName,
      birthdate,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err); // full error print
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};
///
export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { stuName, birthdate, gender } = req.body;

    const updatedStudent = await StudentinfoModel.findByIdAndUpdate(
      studentId,
      { stuName, birthdate, gender },
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
