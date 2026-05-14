// models/AppointmentStatus.js

import mongoose from "mongoose";

const AppointmentStatusSchema =
  new mongoose.Schema(
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConsultationBooking",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "completed",
          "rejected",
        ],
        default: "pending",
      },

      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const AppointmentStatus = mongoose.model(
  "AppointmentStatus",
  AppointmentStatusSchema
);

export default AppointmentStatus;