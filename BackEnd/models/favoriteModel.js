import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
});

const FAVORITE = mongoose.model("FAVORITE", favoriteSchema);

export default FAVORITE;
