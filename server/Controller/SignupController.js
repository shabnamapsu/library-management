// ✅ FILE: Controller/SignupController.js
import UserSignModel from "../models/Sinupmodel.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);

    const { username, phone, email, password } = req.body;

    const existingUser = await UserSignModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSignModel({
      username,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};
