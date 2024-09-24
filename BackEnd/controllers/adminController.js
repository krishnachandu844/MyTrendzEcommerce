import { ADMIN } from "../models/adminModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const admin = z.object({
    username: z
      .string()
      .min(5, { message: "Username is too short" })
      .max(15, { message: "Username is too long" }),
    password: z
      .string()
      .min(5, { message: "Password is too short" })
      .max(15, { message: "Password is too long" }),
  });
  const parsedUser = admin.safeParse(req.body);

  if (!parsedUser.success) {
    const errors = parsedUser.error.issues.map((issue) => ({
      path: issue.path[0], // the field where the issue occurred
      message: issue.message, // the error message for that field
    }));
    return res.status(404).json({ errors });
  }
  const { username, password } = req.body;

  const isAdminExists = await ADMIN.findOne({ username });

  if (!isAdminExists) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = new ADMIN({ username, password: hashedPassword });
    await newAdmin.save();

    res.json({
      message: "Admin Created Successfully",
      adminID: newAdmin._id,
    });
  } else {
    res.status(404).json({ message: "Admin Already exists" });
  }
};

export const login = async (req, res) => {
  const loginAdmin = z.object({
    username: z
      .string()
      .min(5, { message: "Username is too short" })
      .max(15, { message: "Username is too long" }),
    password: z
      .string()
      .min(5, { message: "Password is too short" })
      .max(15, { message: "Password is too long" }),
  });
  const parsedUser = loginAdmin.safeParse(req.body);

  if (!parsedUser.success) {
    const errors = parsedUser.error.issues.map((issue) => ({
      path: issue.path[0], // the field where the issue occurred
      message: issue.message, // the error message for that field
    }));
    return res.status(404).json({ errors });
  }
  const { username, password } = req.body;
  const adminExists = await ADMIN.findOne({ username });
  if (!adminExists) {
    return res.status(401).json({ message: "Admin doesn't exist" }); // Use 401 for unauthorized
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (isPasswordCorrect) {
    const token = jwt.sign(
      {
        adminId: adminExists._id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.json({
      message: "Login Successfully",
      token,
    });
  } else {
    return res.status(401).json({ message: "Password is incorrect" });
  }
};

export const getUsername = async (req, res) => {
  const { username } = req.user;
  if (username) {
    return res.json({ username });
  } else {
    return res.json({ message: "admin is not logged in" });
  }
};
