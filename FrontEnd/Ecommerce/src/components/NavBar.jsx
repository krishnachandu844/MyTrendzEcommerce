import Cookies from "js-cookie";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartContext } from "../context/cartContext";
import {
  House,
  ShoppingBasket,
  Heart,
  ShoppingCart,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

import { Input } from "@/components/ui/input";
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
import "../App.css";
const navItems = [
  {
    name: "Home",
    href: "",
    icon: <House size={30} />,
    active: location.pathname === "/home",
  },
  {
    name: "Products",
    href: "",
    icon: <ShoppingBasket size={30} />,
    active: location.pathname === "/products",
  },
  {
    name: "Favorites",
    href: "",
    icon: <Heart size={30} />,
    active: location.pathname === "/favorites",
  },
  {
    name: "Cart",
    href: "",
    icon: <ShoppingCart size={30} />,
    active: location.pathname === "/cart",
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [username, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const token = Cookies.get("token");

  //nav items

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
      console.log(searchedProducts);
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
    <>
      <DesktopNav className='hidden md:block' />
      <MobileNav />
    </>
  );

  // <div className='sticky top-0 z-10 bg-white mobile:w-36'>
  //   <nav
  //     className={`flex justify-between p-6 items-center h-16 navbar mx-auto bg-white nav-bar`}
  //   >
  //     <h1
  //       className='text-2xl font-black cursor-pointer'
  //       onClick={() => {
  //         navigate("/home");
  //       }}
  //     >
  //       MyTrends
  //     </h1>
  //     {token ? (
  //       <>
  //         <div className=''>
  //           <button className='tablet:hidden mt-2'>
  //             {/* This button can be used for a mobile hamburger menu */}
  //             <svg
  //               className='w-6 h-6'
  //               fill='none'
  //               stroke='currentColor'
  //               viewBox='0 0 24 24'
  //               xmlns='http://www.w3.org/2000/svg'
  //             >
  //               <path
  //                 strokeLinecap='round'
  //                 strokeLinejoin='round'
  //                 strokeWidth='2'
  //                 d='M4 6h16M4 12h16M4 18h16'
  //               ></path>
  //             </svg>
  //           </button>
  //         </div>
  //         <div className='flex justify-between w-full mobile:hidden tablet:flex'>
  //           <div className=' flex gap-8 items-center ml-10'>
  //             <a href='/home' className='font-semibold'>
  //               Home
  //             </a>
  //             <a href='/products' className='font-semibold'>
  //               Products
  //             </a>
  //             <a href='/favorite' className='font-semibold'>
  //               Favorites
  //             </a>
  //           </div>
  //           <div className='flex items-center gap-7 relative '>
  //             <div className='flex items-center relative'>
  //               <Input
  //                 type='text'
  //                 className='w-96 h-10  rounded-lg p-2'
  //                 onKeyDown={searchItems}
  //                 placeholder=' search products...'
  //               />
  //               <FaSearch className='h-10 text-xl absolute right-3' />
  //             </div>
  //             {filteredProducts && filteredProducts.length > 0 ? (
  //               <div className='absolute top-12 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-22 mt-5'>
  //                 <ul>
  //                   {filteredProducts.map((result) => (
  //                     <li
  //                       key={result._id}
  //                       className='p-4 hover:bg-gray-100 cursor-pointer'
  //                       onClick={() => goToProduct(result._id)}
  //                     >
  //                       <div className='flex gap-2 items-center'>
  //                         <img
  //                           src={result.image}
  //                           alt={result.title}
  //                           className='w-28 h-24'
  //                         />
  //                         <p className='font-bold'>{result.title}</p>
  //                       </div>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             ) : searchTerm.length <= 1 ? null : (
  //               <div className='absolute top-12 w-96 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-2'>
  //                 <p>No products matched</p>
  //               </div>
  //             )}
  //           </div>

  //           <a href='/cart' className='font-semibold relative mt-2'>
  //             <ShoppingCart className='h-6 w-7 text-black' />
  //             {cartItems && cartItems.length > 0 && (
  //               <Badge className='absolute -top-2 -right-4 px-2 py-1 text-xs bg-homePrimary hover:bg-homePrimary'>
  //                 {cartItems.length}
  //               </Badge>
  //             )}
  //           </a>
  //           <div className='flex items-center'>
  //             <DropdownMenu>
  //               <DropdownMenuTrigger className='flex items-center'>
  //                 <Avatar>
  //                   <AvatarFallback className='bg-homePrimary text-white'>
  //                     {username.charAt(0)}
  //                   </AvatarFallback>
  //                 </Avatar>
  //                 <p className='ml-2 font-sans font-semibold'>{username}</p>
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent>
  //                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem
  //                   onClick={() => {
  //                     window.location = "/admin";
  //                   }}
  //                 >
  //                   Admin Dashboard
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem>Billing</DropdownMenuItem>
  //                 <DropdownMenuItem>Team</DropdownMenuItem>
  //                 <DropdownMenuItem>Subscription</DropdownMenuItem>
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           </div>
  //           <Button
  //             className='sign-up-button w-24 h-7  rounded-md'
  //             onClick={() => {
  //               Cookies.remove("token");
  //               window.location.href = "/login";
  //             }}
  //           >
  //             Log out
  //           </Button>
  //         </div>
  //       </>
  //     ) : (
  //       <div className='flex gap-6'>
  //         <a href='/login' className='font-semibold'>
  //           Login
  //         </a>
  //         <a href='/' className='font-semibold'>
  //           Sign Up
  //         </a>
  //       </div>
  //     )}
  //   </nav>
  //   <hr />
  // </div>
}

function DesktopNav() {
  const [menuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    console.log(menuOpen);
  };
  return (
    <div
      className={`bg-white ${
        menuOpen ? "w-[230px]" : "w-[80px]"
      } min-h-screen fixed transition-all duration-300 ease-in-out top-0 hidden md:block shadow-lg rounded-e-sm`}
    >
      <h1
        className={`${
          menuOpen
            ? "text-2xl text-center py-4 font-bold flex items-center space-x-5 pl-5"
            : "flex items-center justify-center hover:text-[#0093e9] rounded-lg h-12 pr-4"
        } `}
      >
        {menuOpen ? (
          <>
            <PanelLeftClose
              onClick={toggleMenu}
              size={30}
              className='hover:text-[#0093e9]'
            />
            <span>MyTrendz</span>
          </>
        ) : (
          <PanelLeftOpen size={30} onClick={toggleMenu} />
        )}
      </h1>
      <hr />
      <nav className='flex flex-col h-full text-xl'>
        {menuOpen ? (
          <ul className='flex flex-col gap-[2rem] p-3 pt-8'>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={
                  "hover:bg-[#0093e9] hover:text-white p-[1rem] rounded-md"
                }
              >
                <div className='flex space-x-4'>
                  <p>{item.icon}</p>
                  <p>{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className='flex flex-col gap-[2rem] p-5 pt-8'>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`py-[1rem] ${item.active ? "text-[#0093e9]" : ""}`}
              >
                <div className='flex space-x-4'>
                  <p>{item.icon}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}

function MobileNav() {
  return (
    <Card className='fixed bottom-0 md:hidden w-screen h-12 shadow-lg flex items-center justify-evenly'>
      {navItems.map((item) => (
        <div className='hover:text-[#0093e9]'>{item.icon}</div>
      ))}
    </Card>
  );
}
