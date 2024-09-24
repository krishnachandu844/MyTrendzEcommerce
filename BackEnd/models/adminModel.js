import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export const ADMIN = mongoose.model("ADMIN", adminSchema);
