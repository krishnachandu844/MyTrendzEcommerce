import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Product from "./components/Product";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./components/NotFoundPage";
import CartPage from "./components/CartPage";
import Billing from "./components/Billing";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorite from "./components/Favorite";
import Home from "./components/Home";
import { useState, useEffect } from "react";

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [count, setCount] = useState(0);
  const token = Cookies.get("token");

  const cartCount = cartProducts.length;
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    console.log("incremented");
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };
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
    if (token) {
      init();
    }
  }, [count]);
  return (
    <BrowserRouter>
      <NavBar cartCount={cartCount} />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route
            path='/products'
            element={<Products increment={increment} />}
          />
          <Route
            path='/product/:productId'
            element={<Product increment={increment} />}
          />
          <Route
            path='/favorite'
            element={<Favorite increment={increment} />}
          />
          <Route path='/cart' element={<CartPage decrement={decrement} />} />
          <Route path='/Billing/:totalPrice' element={<Billing />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
