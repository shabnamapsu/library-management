import mongoose from "mongoose";

const userSignSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

});

const UserSignModel = mongoose.model("User", userSignSchema);

export default UserSignModel;