import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "../context/cartContext";
import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [username, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const token = Cookies.get("token");

  //going for specific product onClick
  const goToProduct = (id) => {
    window.location = `/product/${id}`;
  };

  //searching items
  const searchItems = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchTerm(searchWord);
    if (searchWord.length > 2) {
      const searchedProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchWord)
      );

      setFilteredProducts(searchedProducts);
    } else {
      setFilteredProducts([]);
    }
  };

  //getting product items
  const productItems = async () => {
    let response = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/myProducts/getProducts`,
      {
        method: "GET",
      }
    );

    if (response.ok == true) {
      const data = await response.json();
      setProducts(data.products);
    }
  };

  useEffect(() => {
    productItems();
  }, []);

  //getting username
  const getUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_FRONT_END_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok === true) {
      const data = await res.json();
      if (data.message === "Issue with token") {
        Cookies.remove("token");
      }

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
                  type='text'
                  className='w-96 h-10  bg-gray-200 focus:bg-transparent rounded-lg p-2'
                  onKeyDown={searchItems}
                  placeholder=' search products...'
                />
                <FaSearch className='h-10 text-xl absolute right-3' />
              </div>
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className='absolute top-12 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-22 mt-5'>
                  <ul>
                    {filteredProducts.map((result) => (
                      <li
                        key={result._id}
                        className='p-4 hover:bg-gray-100 cursor-pointer'
                        onClick={() => goToProduct(result._id)}
                      >
                        <div className='flex gap-2'>
                          <img
                            src={result.image}
                            alt={result.title}
                            className='w-28 h-24'
                          />
                          <p className='font-bold'>{result.title}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : searchTerm.length <= 1 ? (
                ""
              ) : (
                <div className='absolute top-12 w-96 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-2'>
                  <p>No products matched</p>
                </div>
              )}
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
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center'>
                    <Avatar>
                      <AvatarFallback className='bg-red-500 text-white'>
                        {username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className='ml-2 font-sans font-semibold'>{username}</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        window.location = "/admin";
                      }}
                    >
                      Admin Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* <Avatar>
                  <AvatarFallback className='bg-red-500 text-white'>
                    {username.charAt(0)}
                  </AvatarFallback>
                </Avatar> */}
              </div>
              <Button
                className='sign-up-button w-24 h-7  rounded-md'
                onClick={() => {
                  Cookies.remove("token");
                  window.location.href = "/login";
                }}
              >
                Log out
              </Button>
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
