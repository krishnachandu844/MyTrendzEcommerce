import { USER } from "../models/userModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const user = z.object({
    username: z
      .string()
      .min(5, { message: "Username is too short" })
      .max(15, { message: "Username is too long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password is too short" })
      .max(15, { message: "Password is too long" }),
  });
  const parsedUser = user.safeParse(req.body);

  if (!parsedUser.success) {
    const errors = parsedUser.error.issues.map((issue) => ({
      path: issue.path[0], // the field where the issue occurred
      message: issue.message, // the error message for that field
    }));
    console.log("Error");
    return res.status(404).json({ errors });
  }
  const { username, email, password } = req.body;

  const isUserExists = await USER.findOne({ username });

  if (!isUserExists) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new USER({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "User Created Successfully",
      token,
    });
  } else {
    res.status(404).json({ message: "User Already exists" });
  }
};

export const login = async (req, res) => {
  const loginUser = z.object({
    username: z
      .string()
      .min(5, { message: "Username is too short" })
      .max(15, { message: "Username is too long" }),
    password: z
      .string()
      .min(5, { message: "Password is too short" })
      .max(15, { message: "Password is too long" }),
  });
  const parsedUser = loginUser.safeParse(req.body);

  if (!parsedUser.success) {
    console.log(parsedUser.error);
    const errors = parsedUser.error.issues.map((issue) => ({
      path: issue.path[0], // the field where the issue occurred
      message: issue.message, // the error message for that field
    }));
    return res.status(404).json({ errors });
  }
  const { username, password } = req.body;
  const user = await USER.findOne({ username });
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        message: "Login Successfully",
        token,
      });
    } else {
      res.status(404).json({ message: "Password is incorrect" });
    }
  } else {
    res.status(404).json({ message: "User doesn't exists" });
  }
};
