import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { CartContext } from "../context/cartContext";
import "../App.css";
export default function Product() {
  const { productId } = useParams();
  const { cartItems, setCartItems, token } = useContext(CartContext);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [product, setProduct] = useState();

  // getting favorite items
  const favorite = async () => {
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
    favorite();
  }, []);

  //adding items to favorite section
  const addFavoriteItems = async (productId, title, image, price) => {
    const data = { productId, title, image, price };

    if (favoriteItems && favoriteItems.length > 0) {
      const isFavPresent = favoriteItems.find(
        (fav) => fav.productId === productId
      );

      if (isFavPresent) {
        toast.error("Already added to favorites", { position: "bottom-right" });
      } else {
        //adding if fav item is not present
        const response = await fetch(
          `${import.meta.env.VITE_FRONT_END_URL}/favorite/addFavoriteItems`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok === true) {
          const data = await response.json();
          setFavoriteItems((prevFav) => [...prevFav, ...data.newFavoriteItem]);
          toast.info("Added to favorites", { position: "bottom-right" });
        }
      }
    } else {
      //Adding if the favorite Items are Empty
      const response = await fetch(
        `${import.meta.env.VITE_FRONT_END_URL}/favorite/addFavoriteItems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok === true) {
        const data = await response.json();

        setFavoriteItems([{ ...data.newFavoriteItem }]);
        toast.info("Added to favorites", { position: "bottom-right" });
      }
    }
  };

  //Adding to Cart
  const onClickToAddCart = async (productId, title, price, image) => {
    const cartData = { productId, title, price, image, quantity: 1 };

    if (cartItems && cartItems.length > 0) {
      const isCartPresent = cartItems.find(
        (cart) => cart.productId === productId
      );

      if (isCartPresent) {
        // Updating quantity if product exists in the cart
        const updatedProductsQuantity = cartItems.map((cart) =>
          cart.productId === productId
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
        setCartItems(updatedProductsQuantity);

        const updatedCart = updatedProductsQuantity.find(
          (cart) => cart.productId === productId
        );

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
        // Adding new product to cart if it doesn't exist
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
      //cart is empty adding the product
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

  const init = async () => {
    let response = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/myProducts/singleProduct/` +
        productId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok === true) {
      const data = await response.json();
      setProduct(data.product);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return product ? (
    <div className='bg-container bg-white min-h-screen'>
      <div className='w-custom mx-auto p-2'>
        {/* //product section // */}
        {product && (
          <div className='flex'>
            <div className='single-product-card flex gap-4'>
              <div className='single-product-image p-4'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
            <div className='single-product-description-container m-2 p-4 space-y-4 w-full'>
              <h1 className='text-2xl h-8 overflow-hidden line-clamp-1 font-bold'>
                {product.title}
              </h1>
              <h1 className='text-xl text-homePrimary font-bold'>
                Rs.{product.price}
              </h1>
              <div className='flex gap-3 h-72 overflow-hidden'>
                <h1 className='font-bold'>Description:</h1>
                <div className='text-balance italic text-gray-500'>
                  {product.description}
                </div>
              </div>
              <div className='buttons-container'>
                <Button
                  className='w-5/12 mr-2 bg-homePrimary text-white hover:text-white hover:bg-homePrimary'
                  onClick={() => {
                    onClickToAddCart(
                      product.productId,
                      product.title,
                      product.price,
                      product.image
                    );
                  }}
                >
                  ADD TO CART
                </Button>
                <Button
                  className='w-1/2 '
                  variant='outline'
                  onClick={() => {
                    addFavoriteItems(
                      product.productId,
                      product.title,
                      product.image,
                      product.price
                    );
                  }}
                >
                  ADD TO FAVORITES
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* //comments section // */}
        <div className='comments-section w-full'>
          <h1 className='text-3xl font-extrabold'>Comments</h1>
          <textarea
            className='w-full h-36 mt-5 p-4 bg-gray-100'
            placeholder='Enter Your Comment'
          ></textarea>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-screen'>
      <TailSpin
        visible={true}
        height='200'
        width='100'
        color='black'
        ariaLabel='tail-spin-loading'
        radius='2'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
