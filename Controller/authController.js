// Controller/authController.js

import User from "../Model/User.js";
import jwt from "jsonwebtoken";

//////////////////////////////////////////////////////////
// GENERATE JWT TOKEN
//////////////////////////////////////////////////////////

const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//////////////////////////////////////////////////////////
// SIGNUP FOR NEET CONSULTANCY
//////////////////////////////////////////////////////////

export const Signup = async (
  req,
  res
) => {

  try {

    let {
      name,
      email,
      username,
      password,
      role,
    } = req.body;

    //////////////////////////////////////////////////////
    // CHECK REQUIRED FIELDS
    //////////////////////////////////////////////////////

    if (
      !name ||
      !email ||
      !username ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    //////////////////////////////////////////////////////
    // NORMALIZE DATA
    //////////////////////////////////////////////////////

    username = username
      .toLowerCase()
      .trim();

    email = email
      .toLowerCase()
      .trim();

    //////////////////////////////////////////////////////
    // CHECK EXISTING USER
    //////////////////////////////////////////////////////

    const existingUser =
      await User.findOne({
        $or: [
          { email },
          { username },
        ],
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    //////////////////////////////////////////////////////
    // CREATE USER
    //////////////////////////////////////////////////////

    const user =
      await User.create({
        name,
        email,
        username,
        password,
        role:
          role || "student",
      });

    //////////////////////////////////////////////////////
    // GENERATE TOKEN
    //////////////////////////////////////////////////////

    const token =
      generateToken(user);

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return res.status(201).json({
      success: true,

      message:
        "Account created successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username:
          user.username,
        role: user.role,
      },
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message:
        "Server error",
    });
  }
};

//////////////////////////////////////////////////////////
// LOGIN FOR NEET CONSULTANCY
//////////////////////////////////////////////////////////

export const loginUser = async (
  req,
  res
) => {

  try {

    let {
      username,
      password,
    } = req.body;

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !username ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Username and password are required",
      });
    }

    //////////////////////////////////////////////////////
    // NORMALIZE USERNAME
    //////////////////////////////////////////////////////

    username = username
      .toLowerCase()
      .trim();

    //////////////////////////////////////////////////////
    // FIND USER
    //////////////////////////////////////////////////////

    const user =
      await User.findOne({
        username,
      });

    if (!user) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid username or password",
      });
    }

    //////////////////////////////////////////////////////
    // MATCH PASSWORD
    //////////////////////////////////////////////////////

    const isMatch =
      await user.matchPassword(
        password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid username or password",
      });
    }

    //////////////////////////////////////////////////////
    // GENERATE TOKEN
    //////////////////////////////////////////////////////

    const token =
      generateToken(user);

    //////////////////////////////////////////////////////
    // SUCCESS RESPONSE
    //////////////////////////////////////////////////////

    return res.status(200).json({
      success: true,

      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username:
          user.username,
        role: user.role,
      },
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message:
        "Server error",
    });
  }
};