import mongoose from "mongoose";

const { Schema } = mongoose;

const Searchstudentbyid = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  stuName: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const StudentinfoModel = mongoose.model("StudentInfo", Searchstudentbyid);

export default StudentinfoModel;