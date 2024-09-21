import FAVORITE from "../models/favoriteModel.js";

export const addFavoriteItems = async (req, res) => {
  const { userId } = req.user;
  const { productId, title, image, price } = req.body;
  const newFavoriteItem = new FAVORITE({
    userId,
    productId,
    title,
    image,
    price,
  });
  await newFavoriteItem.save();
  res.json({
    newFavoriteItem,
  });
};

export const getFavoriteItems = async (req, res) => {
  const { userId } = req.user;
  const favoriteItems = await FAVORITE.find({ userId });
  res.json(favoriteItems);
};

export const deleteFavoriteItems = async (req, res) => {
  const { deleteId } = req.params;
  const deleteItem = await FAVORITE.findByIdAndDelete(deleteId);
  if (deleteItem) {
    res.json({ message: "Deleted Successfully" });
  } else {
    res.json({ message: "Error While Deleting The Item" });
  }
};
