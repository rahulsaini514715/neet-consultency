import mongoose from "mongoose";

const counselorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialization: String,
});

export default mongoose.model("Counselor", counselorSchema);