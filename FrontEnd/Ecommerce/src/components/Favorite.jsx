import { useEffect, useState, useContext } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Button } from "@/components/ui/button";

export default function Favorite() {
  const { cartItems, setCartItems, token } = useContext(CartContext);
  const [favoriteItems, setFavoriteItems] = useState();

  //Adding to Cart

  const onClickToAddCart = async (productId, title, price, image) => {
    const cartData = { productId, title, price, image, quantity: 1 };

    if (cartItems && cartItems.length > 0) {
      const isCartPresent = cartItems.find(
        (cart) => cart.productId === productId
      );
      if (isCartPresent) {
        // Update quantity if product exists in the cart
        const updatedProductsQuantity = cartItems.map((cart) =>
          cart.productId === productId
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
        setCartItems(updatedProductsQuantity);

        const updatedCart = updatedProductsQuantity.find(
          (cart) => cart.productId === productId
        );

        // Use `_id` to update cart item on the server
        let res = await fetch(
          `${import.meta.env.VITE_FRONT_END_URL}/cart/updateQuantity/${
            updatedCart._id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: updatedCart.quantity }),
          }
        );

        if (res.ok) {
          toast.info("Updated Quantity", {
            position: "bottom-right",
          });
        } else {
          console.error("Failed to update the cart on the server");
        }
      } else {
        // Add new product to cart if it doesn't exist
        const res = await fetch(
          `${import.meta.env.VITE_FRONT_END_URL}/cart/addCart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cartData),
          }
        );

        if (res.ok) {
          const data = await res.json();

          // Add the returned item (with _id) to the cart
          setCartItems((prevItems) => [
            ...prevItems,
            { ...data.newCartItem, quantity: 1 },
          ]);

          toast.info("Added to cart", {
            position: "bottom-right",
          });
        }
      }
    } else {
      // If the cart is empty, add the product
      const res = await fetch(
        `${import.meta.env.VITE_FRONT_END_URL}/cart/addCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartData),
        }
      );

      if (res.ok) {
        const data = await res.json();

        setCartItems([{ ...data.newCartItem, quantity: 1 }]);

        toast.info("Added to cart", {
          position: "bottom-right",
        });
      }
    }
  };

  //Deleting the favorite Item
  const deleteFavoriteItem = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/favorite/deleteFavoriteItems/` +
        id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok === true) {
      const updatedFavoriteItems = favoriteItems.filter(
        (item) => item._id !== id
      );
      setFavoriteItems(updatedFavoriteItems);
    }
  };

  // getting favorite items
  const init = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/favorite/getFavoriteItems`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok === true) {
      const data = await response.json();
      setFavoriteItems(data);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return favoriteItems && favoriteItems.length !== 0 ? (
    <div className='bg-container min-h-screen'>
      <div className='w-custom mx-auto'>
        <h2 className='text-4xl font-bold pt-4 pb-4'>Favorites</h2>
        <div className='product-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {favoriteItems &&
            favoriteItems.map((item) => (
              <div
                className='card shadow-lg rounded-xl p-6 relative'
                key={item._id}
              >
                <Button
                  variant='outline'
                  className='flex justify-center absolute inset-0 w-14  mt-2 left-80 rounded-full border-none'
                  onClick={() => {
                    deleteFavoriteItem(item._id);
                  }}
                >
                  <IoCloseOutline className='h-6 w-6' />
                </Button>
                <div className=' w-full h-48 mb-4 flex items-center justify-center overflow-hidden rounded-lg'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='h-36'>
                  <div className='h-24'>
                    <h2 className='text-xl font-bold mt-2'>{item.title}</h2>
                  </div>

                  <h2 className='text-lg font-extrabold text-homePrimary'>
                    Rs. {item.price}
                  </h2>
                </div>
                <div className=' mt-2 mb-1 flex justify-between space-x-6 '>
                  <div className=''>
                    <Button
                      className=' flex items-center justify-center bg-homePrimary text-white hover:text-white hover:bg-homePrimary'
                      onClick={() => {
                        onClickToAddCart(
                          item.productId,
                          item.title,
                          item.price,
                          item.image
                        );
                      }}
                    >
                      <ShoppingCart className='h-6 w-6 mr-2' />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-md text-center'>
        <div className='mx-auto h-12 w-12' />
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
          Your Favorites are empty
        </h1>
        <p className='mt-4'>
          Looks like you haven't added anything to your products yet. Let's
          change that!
        </p>
        <div className='mt-6'>
          <Link
            to='/products'
            className='inline-flex items-center rounded-md  px-4 py-2 text-sm font-medium   bg-homePrimary text-white'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
