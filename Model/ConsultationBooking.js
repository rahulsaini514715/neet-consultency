// // models/ConsultationBooking.js

// import mongoose from "mongoose";

// const ConsultationBookingSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     date: {
//       type: String,
//       required: true,
//     },

//     time: {
//       type: String,
//       required: true,
//     },

//     notes: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "approved",
//         "completed",
//         "rejected",
//       ],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const ConsultationBooking = mongoose.model(
//   "ConsultationBooking",
//   ConsultationBookingSchema
// );

// export default ConsultationBooking;


// models/ConsultationBooking.js

import mongoose from "mongoose";

const ConsultationBookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    // Consultant Name
    consultantName: {
      type: String,
      default: "",
      trim: true,
    },

    // Consultation Price
    price: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

const ConsultationBooking = mongoose.model(
  "ConsultationBooking",
  ConsultationBookingSchema
);

export default ConsultationBooking;