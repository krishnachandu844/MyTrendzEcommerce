import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
// Create the CartContext
export const CartContext = createContext();
const token = Cookies.get("token");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      let res = await fetch("http://localhost:3000/cart/cartItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCartItems(data.cart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, []);

  // Add more cart-related functions if needed (add, remove, etc.)

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, token }}>
      {children}
    </CartContext.Provider>
  );
};
