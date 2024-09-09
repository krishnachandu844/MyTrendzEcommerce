import { USER } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
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
  const { username, password } = req.body;
  const user = await USER.findOne({ username });
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      console.log(process.env.JWT_SECRET);
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
    res.status(404).json({ message: "User Doesn't exists" });
  }
};
