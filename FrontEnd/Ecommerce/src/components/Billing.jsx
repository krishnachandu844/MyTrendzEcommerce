import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Billing() {
  const { totalPrice } = useParams();
  const [cartProducts, setCartProduct] = useState();
  const [responseId, setResponseId] = useState("");
  const token = Cookies.get("token");

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
    console.log(amount);
    let data = {
      amount: amount * 100, // Converting rupees to paise
      currency: "INR",
    };
    console.log("click");
    let res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok === true) {
      const data = await res.json();
      console.log(data);
      handleRazorPayScreen(data.amount);
    } else {
      console.log("error");
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

  //cart items
  const init = async () => {
    let response = await fetch("http://localhost:3000/cart/cartItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setCartProduct(data.cart);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='flex justify-center billing-container min-h-screen'>
      <div className=' w-4/5 shadow-xl bg-white mt-11 rounded-xl p-6 h-fit'>
        <div>
          <h2 className='text-3xl font-extrabold'>Billing</h2>
          <p className='mt-1'>
            Review your order and complete the transaction.
          </p>
          <div className='flex'>
            {/* order section */}
            <div className='order-summary-container mt-8 mb-8 rounded-lg p-4 w-1/2'>
              <h2 className='text-3xl font-extrabold'>Order Summary</h2>

              <div className='max-h-80 overflow-y-scroll'>
                {cartProducts &&
                  cartProducts.map((product) => (
                    <div key={product.productId}>
                      <div className='flex justify-between w-4/5 m-4'>
                        <div className='w-4/5'>
                          <h3 className='font-bold'>{product.title}</h3>
                        </div>
                        <div className=''>
                          <h3 className='font-bold'>
                            ${parseFloat(product.price)}
                          </h3>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
              <div className='flex justify-between w-4/5 m-4 '>
                <h2>SubTotal</h2>
                <h2>${totalPrice}</h2>
              </div>
              <div className='flex justify-between w-4/5 m-4'>
                <h2>Shipping</h2>
                <h2>$25.00</h2>
              </div>
              <div className='flex justify-between w-4/5 m-4'>
                <h2>Tax</h2>
                <h2>$17.00</h2>
              </div>
              <hr />
              <div className='flex justify-between w-4/5 m-4'>
                <h2 className='font-extrabold text-xl'>Total</h2>
                <h2 className='font-extrabold text-xl'>
                  {parseFloat(totalPrice) + 25.0 + 17.0}
                </h2>
              </div>
            </div>
            {/* billing address */}
            <div className='order-summary-container mt-8 mb-8 rounded-lg p-4 w-1/2 ml-5'>
              <h2 className='text-3xl font-extrabold'>Billing Information</h2>
              <div className='py-14'>
                <div className='grid gap-2'>
                  <label htmlFor='name' className='font-bold'>
                    Name
                  </label>
                  <input
                    type='text'
                    name=''
                    id='name'
                    placeholder='Enter Your Name'
                    className='rounded-lg text-xl p-2 input-color'
                  />
                </div>
                <br />
                <div className='grid gap-2'>
                  <label htmlFor='address' className='font-bold'>
                    Address
                  </label>
                  <textarea
                    name=''
                    id='address'
                    placeholder='Enter Your Address'
                    className='rounded-lg p-2 input-color'
                    cols={40}
                    rows={5}
                  ></textarea>
                </div>
                <div className='grid gap-2 mt-10'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='default'
                        size='lg'
                        className='w-full bg-red-500 hover:bg-red-600 text-white'
                      >
                        Place Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle className='text-xl'>
                          Proceed to Payment
                        </DialogTitle>
                        <DialogDescription className='text-black'>
                          <span className='block py-6 text-center text-2xl font-bold'>
                            Total: ${parseFloat(totalPrice)}
                          </span>

                          <Button
                            className='w-full'
                            onClick={() => {
                              createRazorpay(
                                parseFloat(totalPrice) + 25.0 + 17.0
                              );
                            }}
                          >
                            Pay Now
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
