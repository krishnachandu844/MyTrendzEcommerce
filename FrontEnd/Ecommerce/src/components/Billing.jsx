import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Billing() {
  const { totalPrice } = useParams();
  const [cartProducts, setCartProduct] = useState();

  //cart items
  const init = async () => {
    let response = await fetch("http://localhost:3000/cartItems", {
      method: "GET",
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
              {cartProducts &&
                cartProducts.map((product) => (
                  <div key={product.id}>
                    <div className='flex justify-between w-4/5 m-4'>
                      <div>
                        <h3 className='font-bold'>{product.title}</h3>
                      </div>
                      <div>
                        <h3 className='font-bold'>${product.price}</h3>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
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
                <h2>Total</h2>
                <h2>$219.00</h2>
              </div>
            </div>
            {/* billing address */}
            <div className='order-summary-container mt-8 mb-8 rounded-lg p-4 w-1/2 ml-5'>
              <h2 className='text-3xl font-extrabold'>Billing Information</h2>
              <br />
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
                <label htmlFor='address'>Address</label>
                <textarea
                  name=''
                  id='address'
                  placeholder='Enter Your Address'
                  className='rounded-lg p-2 input-color'
                  cols={40}
                  rows={4}
                ></textarea>
              </div>
              <button className='btn-color w-full mt-6 h-12 rounded-lg text-white'>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
