import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Document from "../models/documentModel.js";

// @desc    Get documents in a user's directory
// @route   GET /api/v1/users/get-documents
// @access  private
export const getDocuments = asyncHandler(async (req, res) => {
    const { directoryTitle } = req.body;
  
    if (!directoryTitle) {
      res.status(400);
      throw new Error("Directory title is missing");
    }
  
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
  
    const directory = user.directories.find(
      (dir) => dir.title === directoryTitle
    );
  
    if (!directory) {
      res.status(404);
      throw new Error("The specified directory was not found");
    }
  
    res.status(200).json({
      success: true,
      data: directory.documents,
    });
  });

  
// @desc    Delete a document inside one of a user's directories
// @route   DELETE /api/v1/users/delete-document
// @access  private
export const deleteDocument = asyncHandler(async (req, res) => {
    const { directoryTitle, documentId } = req.body;
  
    if (!directoryTitle || !documentId) {
      res.status(400);
      throw new Error("Required fields are missing");
    }
  
    // Find the user directory
    const user = await User.findById(req.user._id);
    const directory = user.directories.find(
      (dir) => dir.title === directoryTitle
    );
  
    if (!directory) {
      res.status(404);
      throw new Error("The specified directory was not found");
    }
  
    // Check if the document exists in the directory
    const documentIndex = directory.documents.findIndex(
      (docId) => docId.toString() === documentId
    );
  
    if (documentIndex === -1) {
      res.status(404);
      throw new Error("The specified document was not found");
    }
  
    // Remove the document from the directory
    directory.documents.splice(documentIndex, 1);
    await user.save();
  
    // Delete the document from the Document collection
    await Document.findByIdAndDelete(documentId);
  
    res.status(200).json({
      success: true,
      data: "Document deleted successfully",
    });
  });

  
// @desc    Add a document to a user's directory
// @route   POST /api/v1/users/add-document
// @access  private
export const addDocument = asyncHandler(async (req, res) => {
    const { title, description, text, directoryTitle } = req.body;
  
    if (!title || !text || !directoryTitle) {
      res.status(400);
      throw new Error("Required fields are missing");
    }
  
    // Create the document
    const newDocument = new Document({
      title,
      description,
      text,
      owner: req.user._id,
    });
  
    // Save the document
    await newDocument.save();
  
    // Find the user directory
    const user = await User.findById(req.user._id);
    const directory = user.directories.find(
      (dir) => dir.title === directoryTitle
    );
  
    if (!directory) {
      res.status(404);
      throw new Error("The specified directory was not found");
    }
  
    // Check if the directory already has a document with the same title
    const existingDocument = await Document.findOne({
      _id: { $in: directory.documents },
      title,
    });
  
    if (existingDocument) {
      res.status(400);
      throw new Error(
        "The specified directory already has a document with the same title"
      );
    }
  
    // Add the document to the user's directory
    directory.documents.push(newDocument._id);
    await user.save();
  
    // Populate the documents in the directories
    await User.findById(req.user._id).populate({
      path: "directories.documents",
      model: "Document",
    });
  
    // Send a success response
    res.status(201).json({
      success: true,
      data: "Document added successfully",
    });
  });