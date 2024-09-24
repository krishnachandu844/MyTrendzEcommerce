import express from "express";
import "dotenv/config";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import adminRoute from "./routes/adminRoute.js";
import productRoute from "./routes/productsRoute.js";
import connectToMongoDb from "./db/connectMongodb.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/favorite", favoriteRoute);
app.use("/admin", adminRoute);
app.use("/myProducts", productRoute);

//RazorPay
//order razorpay
app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

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
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
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
app.listen(3000, () => {
  connectToMongoDb();
  console.log("server started");
});
