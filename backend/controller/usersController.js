import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Document from "../models/documentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getMissingFieldsPrefix } from "../utils/missingFieldsPrefix.js";

// @desc    Get welcome message
// @route   GET /api/v1/users
// @access  Public
export const getWelcome = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: 'Welcome to "Read To Me" app',
  });
});

// @desc    Register a user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, age, email, password } = req.body;

  const missingFields = getMissingFieldsPrefix(req.body);

  if (!!missingFields) {
    res.status(400);
    throw new Error(`${missingFields} mandatory`);
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already registered");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password Length Minimum Is 6 Chars");
  }

  // Hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    name,
    age,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email, name: user.name });
  } else {
    res.status(400);
    throw new Error("User data was not valid");
  }
});

// @desc    Login a user
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Current user info
// @route   GET /api/v1/users/current
// @access  private
export const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password") // Exclude the password field
    .populate({
      path: "directories.documents",
      model: "Document",
    });

  res.json(user);
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/delete-user
// @access  private
export const deleteUser = asyncHandler(async (req, res) => {
  // Find and delete the user's documents
  await Document.deleteMany({ owner: req.user._id });

  // Delete the user
  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({
    success: true,
    data: "User and associated documents deleted successfully",
  });
});
