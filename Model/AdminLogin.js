// models/AdminLogin.js

import mongoose from "mongoose";

const AdminLoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminLogin = mongoose.model(
  "AdminLogin",
  AdminLoginSchema
);

export default AdminLogin;