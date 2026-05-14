// models/Testimonial.js

import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
      ],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model(
  "Testimonial",
  TestimonialSchema
);

export default Testimonial;