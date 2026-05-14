// models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "student",
      ],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

//////////////////////////////////////////////////////////
// HASH PASSWORD BEFORE SAVE
//////////////////////////////////////////////////////////

UserSchema.pre(
  "save",
  async function (next) {

    // IF PASSWORD NOT MODIFIED
    if (!this.isModified("password")) {
      return next();
    }

    try {

      // GENERATE SALT
      const salt =
        await bcrypt.genSalt(10);

      // HASH PASSWORD
      this.password =
        await bcrypt.hash(
          this.password,
          salt
        );

      next();

    } catch (error) {

      next(error);
    }
  }
);

//////////////////////////////////////////////////////////
// MATCH PASSWORD METHOD
//////////////////////////////////////////////////////////

UserSchema.methods.matchPassword =
  async function (enteredPassword) {

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

//////////////////////////////////////////////////////////
// EXPORT MODEL
//////////////////////////////////////////////////////////

const User = mongoose.model(
  "User",
  UserSchema
);

export default User;