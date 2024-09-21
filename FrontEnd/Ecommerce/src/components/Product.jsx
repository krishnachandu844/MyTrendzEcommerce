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
      "http://localhost:3000/favorite/getFavoriteItems",
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
          "http://localhost:3000/favorite/addFavoriteItems",
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
        "http://localhost:3000/favorite/addFavoriteItems",
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
          `http://localhost:3000/cart/updateQuantity/${updatedCart._id}`,
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
        const res = await fetch("http://localhost:3000/cart/addCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartData),
        });

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
      const res = await fetch("http://localhost:3000/cart/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

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
      "https://fakestoreapi.com/products/" + productId,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setProduct(data);
  };

  useEffect(() => {
    init();
  }, []);

  return product ? (
    <div className='bg-container'>
      <div className='product-container mx-auto'>
        {/* //product section // */}
        {product && (
          <div className='p-4 flex flex-1'>
            <div className='image-container bg-color rounded-lg w-1/2 flex items-center justify-center overflow-hidden p-2 shadow-lg'>
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-full object-contain'
              />
            </div>
            <div className='product-desc-container ml-5 w-1/2'>
              <h1 className='title  w-full m-2 text-3xl font-extrabold'>
                {product.title}
              </h1>
              <h1 className='m-2 text-2xl font-black product-heading'>
                ${product.price}
              </h1>
              <p className='description w-full m-2 h-44 mt-8 text-lg from-neutral-500 font-sans overflow-y-auto'>
                {product.description}
              </p>
              <div className='mt-24 flex w-full'>
                <button
                  className='sign-up-button w-full h-10 rounded-md'
                  onClick={() => {
                    onClickToAddCart(
                      product.id,
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
                      product.id,
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
