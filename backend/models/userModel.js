import mongoose from "mongoose";



const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Email already registered"],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestemps: true,
  }
);
export default mongoose.model("User", userSchema);
