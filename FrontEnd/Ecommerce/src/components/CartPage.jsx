import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { CartContext } from "../context/cartContext";
import { Button } from "@/components/ui/button";
import { CircleX, MoveLeft } from "lucide-react";
export default function CartPage() {
  const { cartItems, setCartItems, token } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  //increment and decrement quantity
  const onIncrement = async (id) => {
    const updatedProductsQuantity = cartItems.map((cart) =>
      cart._id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
    );
    setCartItems(updatedProductsQuantity);
    const updatedCart = updatedProductsQuantity.find((cart) => cart._id === id);
    let res = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/cart/updateQuantity/` + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: updatedCart.quantity }),
      }
    );
  };
  const onDecrement = async (id) => {
    const updatedProductsQuantity = cartItems.map((cart) =>
      cart._id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
    );

    const updatedCart = updatedProductsQuantity.find((cart) => cart._id === id);
    if (updatedCart.quantity === 0) {
      alert("At least It should be one item");
      return;
    } else {
      setCartItems(updatedProductsQuantity);
      let res = await fetch(
        `${import.meta.env.VITE_FRONT_END_URL}cart/updateQuantity/` + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: updatedCart.quantity }),
        }
      );
    }
  };

  //Deleting cart
  const deleteCart = async (cartId, dbCartId) => {
    let res = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/cart/` + dbCartId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok == true) {
      let updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== dbCartId
      );

      setCartItems(updatedCartItems);
    }
  };

  //getting total price
  useEffect(() => {
    if (cartItems) {
      let cost = cartItems.reduce(
        (acc, cart) => acc + cart.price * cart.quantity,
        0
      );
      setTotalPrice(cost);
    }
  }, [cartItems]);

  return cartItems ? (
    cartItems.length === 0 ? (
      <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-md text-center'>
          <div className='mx-auto h-12 w-12' />
          <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
            Your cart is empty
          </h1>
          <p className='mt-4'>
            Looks like you haven't added anything to your cart yet. Let's change
            that!
          </p>
          <div className='mt-6'>
            <Link
              to='/products'
              className='inline-flex items-center rounded-md  px-4 py-2 text-sm font-medium  shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-black text-white'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className='w-custom mx-auto p-2 flex gap-2 mt-5'>
        <div className='shopping-container'>
          <h1 className='text-4xl pt-3 pb-4 font-bold pl-4'>Shopping Cart</h1>
          <div className='cart-products w-full  flex h-8 items-center bg-gray-300'>
            <h1 className='w-4/5 pl-16 font-bold '>PRODUCTS</h1>
            <h1 className='w-24   text-center font-bold'>PRICE</h1>
            <h1 className='w-44  text-center font-bold'>QUANTITY</h1>
          </div>
          <div className=' overflow-y-auto max-h-52'>
            {cartItems &&
              cartItems.map((cartProduct) => (
                <div className='space-y-6' key={cartProduct._id}>
                  <div className='flex w-full my-2 h-24'>
                    <div className='flex w-4/5 items-center justify-center'>
                      <CircleX
                        className='pl-4 w-12 h-12 text-red-400 cursor-pointer'
                        onClick={() => {
                          deleteCart(cartProduct.id, cartProduct._id);
                        }}
                      />
                      <div className='w-80 h-20 items-center'>
                        <img
                          src={cartProduct.image}
                          className='w-full h-full object-contain'
                        />
                      </div>
                      <h1 className='text-wrap w-full overflow-hidden font-medium'>
                        {cartProduct.title}
                      </h1>
                    </div>
                    {/* price */}
                    <div className='w-24 text-center flex items-center justify-center'>
                      <h1 className='text-green-600 font-bold'>
                        Rs.{cartProduct.price * cartProduct.quantity}
                      </h1>
                    </div>
                    {/* quantity */}
                    <div className='w-44 flex items-center justify-center gap-4'>
                      <div>
                        <button
                          className='bg-slate-300 w-5'
                          onClick={() => {
                            onDecrement(cartProduct._id);
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div>{cartProduct.quantity}</div>
                      <div className='hover:bg-slate-200'>
                        <button
                          className='bg-slate-300 w-5'
                          onClick={() => {
                            onIncrement(cartProduct._id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <hr />
          <div className='ml-8 my-4'>
            <Button
              onClick={() => {
                navigate("/home");
              }}
            >
              <MoveLeft className='mr-2' />
              RETURN TO SHOP
            </Button>
          </div>
        </div>
        {/* /**Total Cart */}
        <div className='total-price-cart-card p-4'>
          <h1 className='font-bold text-3xl pl-3'>Total</h1>
          <div className='w-full h-48 p-4 space-y-2'>
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
            <p className='font-extrabold'>Rs.{totalPrice + 720}</p>
          </div>
          <Button
            className='w-full mt-5 bg-btnColor hover:bg-btnColor'
            onClick={() => {
              navigate(`/Billing/${parseFloat(totalPrice.toFixed(2))}`);
            }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    )
  ) : (
    <div className='flex justify-center items-center h-screen'>
      <TailSpin
        visible={true}
        height='200'
        width='100'
        color='black'
        ariaLabel='tail-spin-loading'
        radius='2'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
