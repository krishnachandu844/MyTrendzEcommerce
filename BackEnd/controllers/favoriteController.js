import FAVORITE from "../models/favoriteModel.js";

export const addFavoriteItems = async (req, res) => {
  const { title, image, price } = req.body;
  const newFavoriteItem = new FAVORITE({ title, image, price });
  await newFavoriteItem.save();
  res.json({
    message: "Favorite Item Added Successfully",
    favoriteId: newFavoriteItem._id,
  });
};

export const getFavoriteItems = async (req, res) => {
  const favoriteItems = await FAVORITE.find({});
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
