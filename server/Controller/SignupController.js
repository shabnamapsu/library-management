import UserSignModel from "../models/Sinupmodel.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);

    const { username, phone, email, password } = req.body;

    // Check missing fields
    if (!username || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Duplicate check
    const existingUser = await UserSignModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new UserSignModel({
      username,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
