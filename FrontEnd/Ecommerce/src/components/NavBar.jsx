import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [cartProducts, setCartProduct] = useState();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const init = async () => {
    let response = await fetch("http://localhost:3000/cartItems", {
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
    if (token) {
      init();
    }
  }, [cartProducts]);

  return (
    <div className='sticky top-0 z-10 bg-white'>
      <nav className='flex justify-between  p-6 items-center h-14 navbar mx-auto'>
        <h1 className='text-2xl font-black'>MyTrends</h1>
        {token ? (
          <div className='flex gap-6'>
            <a href='' className='font-semibold'>
              Home
            </a>
            <a href='/products' className='font-semibold'>
              Products
            </a>
            <a href='' className='font-semibold'>
              About
            </a>
            <a href='/cart' className='font-semibold'>
              Cart
              {cartProducts &&
                cartProducts.length > 0 &&
                `(${cartProducts.length})`}
            </a>
            <button
              className='sign-up-button w-24 h-7  rounded-md'
              onClick={() => {
                Cookies.remove("token");
                navigate("/login");
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className='flex gap-6'>
            <a href='/login' className='font-semibold'>
              Login
            </a>
            <a href='/' className='font-semibold'>
              Sign Up
            </a>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
}
