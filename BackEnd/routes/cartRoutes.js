import express from "express";
import {
  addCart,
  cartItems,
  updateQuantity,
  deleteCart,
} from "../controllers/cartController.js";
import authenticateJwt from "../middleware/authorization.js";

const router = express.Router();

router.post("/addCart", addCart);

router.get("/cartItems", authenticateJwt, cartItems);

router.put("/updateQuantity/:cartId", authenticateJwt, updateQuantity);

router.delete("/:cartId", authenticateJwt, deleteCart);

export default router;
