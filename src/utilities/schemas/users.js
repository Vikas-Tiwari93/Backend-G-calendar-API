import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
  },
});

export const User = mongoose.model("Users", userSchema);
