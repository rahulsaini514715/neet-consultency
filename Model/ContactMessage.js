// models/ContactMessage.js

import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "replied",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model(
  "ContactMessage",
  ContactMessageSchema
);

export default ContactMessage;