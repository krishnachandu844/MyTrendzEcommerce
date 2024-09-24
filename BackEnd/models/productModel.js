import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: String,
  title: String,
  description: String,
  image: String,
  price: Number,
  category: String,
});

const PRODUCT = mongoose.model("PRODUCT", productSchema);

export default PRODUCT;
