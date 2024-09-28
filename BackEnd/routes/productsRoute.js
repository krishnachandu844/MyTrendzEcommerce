import express from "express";

import authenticateJwt from "../middleware/authorization.js";
import {
  addProduct,
  getProducts,
  singleProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/addProduct", authenticateJwt, addProduct);

router.get("/getProducts", authenticateJwt, getProducts);

router.get("/singleProduct/:productId", authenticateJwt, singleProduct);

export default router;
