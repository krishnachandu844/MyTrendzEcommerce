import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function NavBar() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState();
  const token = Cookies.get("token");

  //getting cart items
  const init = async () => {
    let res = await fetch("http://localhost:3000/cart/cartItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok === true) {
      const data = await res.json();
      setCartProducts(data.cart);
    }
  };

  useEffect(() => {
    init();
  });

  return (
    <div className='sticky top-0 z-10 bg-white'>
      <nav className='flex justify-between  p-6 items-center h-14 navbar mx-auto'>
        <h1
          className='text-2xl font-black cursor-pointer'
          onClick={() => {
            navigate("/home");
          }}
        >
          MyTrends
        </h1>
        {token ? (
          <div className='flex gap-6'>
            <a href='/home' className='font-semibold'>
              Home
            </a>
            <a href='/products' className='font-semibold'>
              Products
            </a>
            <a href='/favorite' className='font-semibold'>
              Favorites
            </a>
            <a href='/cart' className='font-semibold'>
              Cart
              {/* {cartProducts.length === 0 ? (
                ""
              ) : (
                <Badge variant='outline' className='bg-black text-white'>
                  {cartProducts.length}
                </Badge>
              )} */}
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
