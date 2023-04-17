import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Document from "../models/documentModel.js";

// @desc    Add a directory for a user
// @route   POST /api/v1/users/add-directory
// @access  private
export const addDirectory = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const directory = { title, documents: [] };
  
    const existingDirectory = await User.findOne({
      _id: req.user._id,
      "directories.title": title,
    });
  
    if (existingDirectory) {
      res.status(400);
      throw new Error("Already have Such directory");
    }
  
    // Add the new directory to the user's directories array
    req.user.directories.push(directory);
    try {
      await req.user.save();
    } catch (error) {
      res.status(500);
      throw new Error("Can't Add Directory");
    }
    // Save the updated user
  
    // Send a success response
    res.status(201).json({
      success: true,
      data: "Directory added successfully",
    });
  });

  // @desc    Delete a user's directory
// @route   DELETE /api/v1/users/delete-directory
// @access  private
export const deleteDirectory = asyncHandler(async (req, res) => {
    const { directoryTitle } = req.body;
  
    if (!directoryTitle) {
      res.status(400);
      throw new Error("Directory title is missing");
    }
  
    const user = await User.findById(req.user._id);
  
    // Find the directory
    const directoryIndex = user.directories.findIndex(
      (dir) => dir.title === directoryTitle
    );
  
    if (directoryIndex === -1) {
      res.status(404);
      throw new Error("The specified directory was not found");
    }
  
    // Delete all the documents in the directory
    const documentIds = user.directories[directoryIndex].documents;
    await Document.deleteMany({ _id: { $in: documentIds } });
  
    // Delete the directory
    user.directories.splice(directoryIndex, 1);
    await user.save();
  
    res.status(200).json({
      success: true,
      data: "Directory and associated documents deleted successfully",
    });
  });

  
// @desc    Delete all user's directories and associated documents
// @route   DELETE /api/v1/users/delete-directories
// @access  private
export const deleteDirectories = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user.directories.length === 0) {
      return res.status(200).json({
        success: true,
        data: "No Directories exist",
      });
    }
  
    // Delete all associated documents
    await Document.deleteMany({ owner: user._id });
  
    // Delete all directories
    user.directories = [];
    await user.save();
  
    res.status(200).json({
      success: true,
      data: "Directories and associated documents deleted successfully",
    });
  });

  
  // @desc    Get all directories for a user
// @route   GET /api/v1/users/get-directories
// @access  private
export const getDirectories = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
      .select("directories")
      .populate({
        path: "directories.documents",
        model: "Document",
      });
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    res.status(200).json({
      success: true,
      data: user.directories,
    });
  });
  