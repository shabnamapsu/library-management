import mongoose from "mongoose";

const { Schema } = mongoose;

const userLoginSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserloginModel = mongoose.model("Loginuser", userLoginSchema);
export default UserloginModel;
