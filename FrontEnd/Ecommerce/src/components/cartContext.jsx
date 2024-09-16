import { createContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Cookies from "js-cookie";

// Create Context
export const cartContext = createContext();

// Token
const token = Cookies.get("token");

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any fetch errors

  // Fetch cart items from server
  const init = async () => {
    try {
      let response = await fetch("http://localhost:3000/cart/cartItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartProducts(data.cart || []); // Handle empty cart scenario
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      init();
    } else {
      setLoading(false); // Stop loading if no token is found
    }
  }, []);

  return (
    <cartContext.Provider value={{ cartProducts, loading, error }}>
      <NavBar />
    </cartContext.Provider>
  );
};
