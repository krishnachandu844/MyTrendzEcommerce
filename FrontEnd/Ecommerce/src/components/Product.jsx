import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { CartContext } from "../context/cartContext";

export default function Product() {
  const { productId } = useParams();
  const { cartItems, setCartItems, token } = useContext(CartContext);
  const [favoriteItems, setFavoriteItems] = useState();

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
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    favorite();
  }, []);

  //adding items to favorite section
  const addFavoriteItems = async (productId, title, image, price) => {
    const data = { productId, title, image, price };
    console.log(productId);
    if (favoriteItems && favoriteItems.length > 0) {
      const isFavPresent = favoriteItems.find(
        (fav) => fav.productId === productId
      );
      console.log(isFavPresent);
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
        } else {
          console.log("Error");
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
      } else {
        console.log("Error");
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
      console.log(isCartPresent);
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok === true) {
      const data = await response.json();
      setProduct(data.product);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return product ? (
    <div className='bg-container bg-gray-200 min-h-screen'>
      <div className='product-container mx-auto'>
        {/* //product section // */}
        {product && (
          <div className='p-4 flex flex-1'>
            <div className='image-container bg-color rounded-lg w-1/2 h-96 flex items-center justify-center overflow-hidden p-2 shadow-lg'>
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-full object-contain'
              />
            </div>
            <div className='product-desc-container ml-2 w-1/2 h-96 '>
              <h1 className='title  w-full ml-2 my-1 text-3xl font-extrabold line-clamp-1'>
                {product.title}
              </h1>
              <h1 className='ml-2 my-1 text-2xl h-10'>Rs.{product.price}</h1>
              <div className='flex ml-2'>
                <p className='mt-1 mr-8 font-bold'>Description:</p>
                <p className='description w-full  h-60 text-lg text-gray-500 font-sans italic line-clamp-4 overflow-y-auto'>
                  {product.description}
                </p>
              </div>

              <div className=' flex w-full mt-3'>
                <button
                  className='sign-up-button w-full h-10 rounded-md'
                  onClick={() => {
                    onClickToAddCart(
                      product.productId,
                      product.title,
                      product.price,
                      product.image
                    );
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className='fav-btn w-full h-10 ml-2 rounded-md hover:text-red-400'
                  onClick={() => {
                    addFavoriteItems(
                      product.productId,
                      product.title,
                      product.image,
                      product.price
                    );
                  }}
                >
                  Add To Favorites
                </button>
              </div>
            </div>
          </div>
        )}
        {/* //comments section // */}
        <div className='comments-section p-4'>
          <h1 className='text-3xl font-extrabold'>Comments</h1>
          <textarea
            className='w-full h-36 mt-5 p-4'
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
