import mongoose from "mongoose";

const consultationHistorySchema = new mongoose.Schema({
  studentName: String,
  counselor: String,
  date: Date,
  notes: String,
});

export default mongoose.model(
  "ConsultationHistory",
  consultationHistorySchema
);


