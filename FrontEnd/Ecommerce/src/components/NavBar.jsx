import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "../context/cartContext";
import { ShoppingCart } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaSearch } from "react-icons/fa";

export default function NavBar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [username, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const token = Cookies.get("token");

  //searching items
  const searchItems = (e) => {
    const searchWord = e.target.value.toLowerCase();
    const searchedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchWord)
    );
    console.log(searchedProducts);
  };

  //getting product items
  const productItems = async () => {
    let response = await fetch("http://localhost:3000/myProducts/getProducts", {
      method: "GET",
    });

    if (response.ok == true) {
      const data = await response.json();
      setProducts(data.products);
    } else {
      console.log("unable to get data");
    }
  };

  useEffect(() => {
    productItems();
  }, []);

  //getting username
  const getUser = async () => {
    const res = await fetch("http://localhost:3000/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();

      setUserName(data.username);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div className='sticky top-0 z-10 bg-white'>
      <nav
        className={`flex ${
          token ? "" : "justify-between"
        } p-6 items-center h-16 navbar mx-auto`}
      >
        <h1
          className='text-2xl font-black cursor-pointer'
          onClick={() => {
            navigate("/home");
          }}
        >
          MyTrends
        </h1>
        {token ? (
          <div className='flex  justify-between w-full'>
            <div className=' flex gap-8 items-center ml-10'>
              <a href='/home' className='font-semibold'>
                Home
              </a>
              <a href='/products' className='font-semibold'>
                Products
              </a>
              <a href='/favorite' className='font-semibold'>
                Favorites
              </a>
            </div>
            <div className='flex items-center gap-7 '>
              <div className='flex items-center relative'>
                <input
                  type='search'
                  className='w-96 h-10  bg-gray-200 focus:bg-transparent rounded-md'
                  onKeyDown={searchItems}
                />
                <FaSearch className='h-10 text-xl absolute right-3' />
              </div>
              <a href='/cart' className='font-semibold relative'>
                <ShoppingCart className='h-6 w-7 text-black' />
                {cartItems && cartItems.length > 0 && (
                  <Badge
                    variant='destructive'
                    className='absolute -top-2 -right-4 px-2 py-1 text-xs'
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </a>
              <div className='flex items-center'>
                <Avatar>
                  {/* <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} /> */}
                  <AvatarFallback className='bg-red-500 text-white'>
                    {username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className='ml-2 font-sans font-semibold'>{username}</span>
              </div>
              <button
                className='sign-up-button w-24 h-7  rounded-md'
                onClick={() => {
                  Cookies.remove("token");
                  window.location.href = "/login";
                }}
              >
                Log out
              </button>
            </div>
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
