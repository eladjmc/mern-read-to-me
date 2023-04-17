  import mongoose from "mongoose";
  import Document from "./documentModel.js";

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add the full name"],
      },

      age: {
        type: Number,
        default: null,
      },

      email: {
        type: String,
        required: [true, "Please add the user name"],
        unique: [true, "Email already registered"],
        match: [/^\S+@\S+\.\S+$/, "Please add a valid email"],
      },

      password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password should be at least 6 characters long"],
      },
      directories: [
        {
          title: {
            type: String,
            required: [true, "Please add the Directory Title"],
            maxlength:[100, "Title is too long!"],
          },
          documents: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Document",
            },
          ],
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model("User", userSchema);
