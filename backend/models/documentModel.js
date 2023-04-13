import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the Document Title"],
      maxlength: [100, "Title is too long!"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description is too long!"],
    },
    text: {
      type: String,
      required: [true, "Please add text to the document"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add the document owner"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);