import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { useEffect, useState } from "react";
import { cartContext } from "./cartContext";

export default function NavBar() {
  // const [cartProducts, setCartProduct] = useState();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const { cartProducts, loading, error } = useContext(cartContext);

  // const init = async () => {
  //   let response = await fetch("http://localhost:3000/cart/cartItems", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await response.json();
  //   setCartProduct(data.cart);
  // };

  // useEffect(() => {
  //   if (token) {
  //     init();
  //   }
  // }, []);

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
              Cart ({cartProducts.length}) {/* Display cart count */}
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
