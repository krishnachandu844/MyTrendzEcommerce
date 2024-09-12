import express from "express";
import authenticateJWT from "../middleware/authorization.js";
import {
  addFavoriteItems,
  deleteFavoriteItems,
  getFavoriteItems,
} from "../controllers/favoriteController.js";
import authenticateJwt from "../middleware/authorization.js";

const router = express.Router();

router.post("/addFavoriteItems", authenticateJWT, addFavoriteItems);

router.get("/getFavoriteItems", authenticateJWT, getFavoriteItems);

router.delete(
  "/deleteFavoriteItems/:deleteId",
  authenticateJwt,
  deleteFavoriteItems
);

export default router;
