import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  productId: Number,
  title: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

export const CART = mongoose.model("CART", cartSchema);
