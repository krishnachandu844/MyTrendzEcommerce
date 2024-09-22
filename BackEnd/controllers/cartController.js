import { CART } from "../models/cartmodel.js";

export const cartItems = async (req, res) => {
  const { userId } = req.user;
  const cart = await CART.find({ userId });
  if (cart) {
    res.json({ cart });
  } else {
    res.json({ message: "Error while getting cart items" });
  }
};
export const addCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, title, price, image, quantity } = req.body;

  const newCartItem = new CART({
    userId,
    productId,
    title,
    price,
    image,
    quantity,
  });
  await newCartItem.save();
  res.json({
    newCartItem,
  });
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
