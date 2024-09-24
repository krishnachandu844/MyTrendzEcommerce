import express from "express";

import authenticateJwt from "../middleware/authorization.js";
import { addProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/addProduct", addProduct);

router.get("/getProducts", getProducts);

export default router;
