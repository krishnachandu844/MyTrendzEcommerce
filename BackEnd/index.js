import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//SECRET KEY
const secret = "SECR@#RT";

//mongoose schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const cartSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

//model //
const USER = mongoose.model("USER", userSchema);
const CART = mongoose.model("CART", cartSchema);

//RazorPay

//order razorpay
app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: "rzp_test_QJTNeOoTovszWR",
    key_secret: "zecxgy1A9MnIX6eIRh7xdjVF",
  });
  console.log(req.body);
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "Receipt",
    payment_capture: 1,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (e) {
    console.log(e);
  }
});

//get razorpay
app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;
  const razorpay = new Razorpay({
    key_id: "rzp_test_QJTNeOoTovszWR",
    key_secret: "zecxgy1A9MnIX6eIRh7xdjVF",
  });
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(400).json({ message: "Error at razorpay loading.." });
    }
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed To Fetch" });
  }
});

//signup route
app.post("/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await USER.findOne({ username });
  if (!isUserExists) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new USER({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    res.json({
      message: "User Created Successfully",
      token,
    });
  } else {
    res.status(404).json({ message: "User Already exists" });
  }
});

//login route
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await USER.findOne({ username });
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
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
});

//cart backend route

//add cart
app.post("/cart", async (req, res) => {
  const { id, title, price, image, quantity } = req.body;
  const newCartItem = new CART({ id, title, price, image, quantity });
  await newCartItem.save();
  res.json({ message: "Cart Added Successfully", cartId: newCartItem._id });
});

//delete cart
app.delete("/cart/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const cart = await CART.findByIdAndDelete(cartId);
  if (cart) {
    res.json({ message: "Cart deleted Successfully" });
  } else {
    res.json({ message: "Error while deleting" });
  }
});

//get cart items
app.get("/cartItems", async (req, res) => {
  const cart = await CART.find({});
  if (cart) {
    res.json({ cart });
  } else {
    res.json({ message: "Error while getting cart items" });
  }
});

//update quantity
app.put("/cart/updateQuantity/:cartId", async (req, res) => {
  const id = req.params.cartId;
  const { quantity } = req.body;
  const updatedCartItem = await CART.findByIdAndUpdate(
    id,
    { $set: { quantity: quantity } },
    { new: true }
  );
  if (updatedCartItem) {
    res.json({ message: "quantity updated successfully" });
  }
});

app.listen(3000, () => {
  try {
    mongoose.connect(
      "mongodb+srv://krishnachandu844:bqhi7zDlwvCdLVGS@cluster0.oabgayy.mongodb.net/E-commerce"
    );
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
  console.log("server started");
});
