import PRODUCT from "../models/productModel.js";
import { v4 as uuidv4 } from "uuid";

export const addProduct = async (req, res) => {
  const { title, description, image, price, category } = req.body;
  const newProduct = new PRODUCT({
    productId: uuidv4(),
    title,
    description,
    image,
    price,
    category,
  });
  await newProduct.save();
  if (newProduct) {
    res.json({ newProduct });
  } else {
    return res.status(401).json({ message: "Unable to add product" });
  }
};

export const getProducts = async (req, res) => {
  const products = await PRODUCT.find({});
  if (products) {
    res.json({ products });
  } else {
    return res.status(401).json({ message: "Unable to get products" });
  }
};
