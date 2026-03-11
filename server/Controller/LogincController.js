import UserSignModel from "../models/Sinupmodel.js";
import bcrypt from "bcryptjs";

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check empty fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    // find user
    const user = await UserSignModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // success
    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};