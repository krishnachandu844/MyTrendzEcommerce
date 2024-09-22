import express from "express";
import { signup, login, getUsername } from "../controllers/authcontroller.js";
import authenticateJwt from "../middleware/authorization.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/me", authenticateJwt, getUsername);

export default router;
