import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: String,
  title: String,
  description: String,
  image: String,
  price: Number,
});

const PRODUCT = mongoose.model("PRODUCT", productSchema);

export default PRODUCT;
