import { CART } from "../models/cartmodel.js";

export const cartItems = async (req, res) => {
  const cart = await CART.find({});
  if (cart) {
    res.json({ cart });
  } else {
    res.json({ message: "Error while getting cart items" });
  }
};
export const addCart = async (req, res) => {
  const { id, title, price, image, quantity } = req.body;
  const newCartItem = new CART({ id, title, price, image, quantity });
  await newCartItem.save();
  res.json({ message: "Cart Added Successfully", cartId: newCartItem._id });
};

export const updateQuantity = async (req, res) => {
  const id = req.params.cartId;
  const { quantity } = req.body;
  const updatedCartItem = await CART.findByIdAndUpdate(
    id,
    { $set: { quantity: quantity } },
    { new: true }
  );
  if (updatedCartItem) {
    res.json({ message: "quantity updated successfully" });
  }
};

export const deleteCart = async (req, res) => {
  const { cartId } = req.params;
  const cart = await CART.findByIdAndDelete(cartId);
  if (cart) {
    res.json({ message: "Cart deleted Successfully" });
  } else {
    res.json({ message: "Error while deleting" });
  }
};
