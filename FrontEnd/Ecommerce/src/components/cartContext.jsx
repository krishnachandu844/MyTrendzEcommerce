import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Create Context
export const CartContext = createContext();

// Token
const token = Cookies.get("token");

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

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
    }
  };

  useEffect(() => {
    if (token) {
      init();
    }
  }, [token]);

  return (
    <CartContext.Provider value={{ cartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
