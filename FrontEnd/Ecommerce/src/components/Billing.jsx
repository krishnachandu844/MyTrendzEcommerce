import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { CartContext } from "../context/cartContext";
import "../App.css";

export default function Billing() {
  const { cartItems } = useContext(CartContext);
  const { totalPrice } = useParams();

  const [responseId, setResponseId] = useState("");
  //loadScript
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  //razorpay
  const createRazorpay = async (amount) => {
    let data = {
      amount: amount * 100, // Converting rupees to paise
      currency: "INR",
    };

    let res = await fetch(`${import.meta.env.VITE_FRONT_END_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok === true) {
      const data = await res.json();

      handleRazorPayScreen(data.amount);
    }
  };

  //razorpay screen

  const handleRazorPayScreen = async (amt) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: "rzp_test_QJTNeOoTovszWR",
      amount: amt,
      currency: "INR",
      name: "papaya coders",
      description: "payment to papaya coders",
      image: "https://papayacoders.com/demo.png",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "papaya coders",
        email: "papayacoders@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className='w-custom mx-auto pt-4 flex gap-2'>
      <div className='billing-container p-4'>
        <h1 className='text-2xl font-bold'>Billing Information</h1>
        <div className='username-container space-y-2 mt-2'>
          <div className='space-y-2'>
            <Label>Username</Label>
            <div className='flex gap-2'>
              <Input type='text' placeholder='First name'></Input>
              <Input type='text' placeholder='Last name'></Input>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='address' className=''>
              Address
            </Label>

            <Textarea
              name=''
              id='address'
              placeholder='Enter Your Address'
              className='rounded-lg p-2'
              cols={40}
              rows={5}
            ></Textarea>
          </div>
          <div className=' flex gap-2 w-full'>
            <div className='w-1/2'>
              <Label>Email</Label>
              <Input type='email'></Input>
            </div>
            <div className=' w-1/2'>
              <Label>Phone Number</Label>
              <Input type='text'></Input>
            </div>
          </div>
        </div>
      </div>
      {/* /**Total Cart */}
      <div className='total-price-cart-card p-4'>
        <h1 className='font-bold text-3xl pl-3'>Total</h1>
        <div className='overflow-y-auto'>
          {cartItems.map((cart) => (
            <div className='w-full h-24 flex items-center gap-2'>
              <div className='h-44'>
                <img
                  src={cart.image}
                  className='w-full h-full object-contain'
                />
              </div>

              <h1 className='h-6 overflow-hidden'>{cart.title}</h1>
            </div>
          ))}
        </div>
        <div className='w-full h-auto p-4 space-y-2'>
          <div className='flex justify-between'>
            <p className='font-medium text-gray-500'>Sub Total</p>
            <p className='font-medium'>Rs.{totalPrice}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-gray-500'>Shipping</p>
            <p className='font-medium'>Free</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-gray-500'>Discount</p>
            <p className='font-medium'> Rs.72</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-gray-500'> Tax</p>
            <p className='font-medium'> Rs.720</p>
          </div>
        </div>
        <hr />
        <div className='flex justify-between my-2 px-4'>
          <p className='font-extrabold'>Total</p>
          <p className='font-extrabold'>Rs.{parseInt(totalPrice) + 720}</p>
        </div>
        <Button
          className='w-full mt-5 bg-btnColor hover:bg-btnColor'
          onClick={() => {
            createRazorpay(parseInt(totalPrice) + 720);
          }}
        >
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
}
