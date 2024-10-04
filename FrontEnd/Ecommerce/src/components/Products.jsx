import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { GrFavorite } from "react-icons/gr";

import { ShoppingCart } from "lucide-react";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";

import "../App.css";

export default function Products() {
  const token = Cookies.get("token");
  const { cartItems, setCartItems } = useContext(CartContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  //onClicking We go to single product
  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  //onClicking getting items based on category
  const onClickGetAllProducts = (e) => {
    setProducts(allProducts);
  };

  const onClickGetElectronics = (e) => {
    const updatedProducts = allProducts.filter(
      (product) => product.category === "Electronics"
    );
    setProducts(updatedProducts);
  };
  const onClickGetGrocery = (e) => {
    const updatedProducts = allProducts.filter(
      (product) => product.category === "Grocery"
    );
    setProducts(updatedProducts);
  };
  const onClickGetMobiles = (e) => {
    const updatedProducts = allProducts.filter(
      (product) => product.category === "Mobiles"
    );

    setProducts(updatedProducts);
  };
  const onClickGetFashion = (e) => {
    const updatedProducts = allProducts.filter(
      (product) => product.category === "Fashion"
    );
    setProducts(updatedProducts);
  };
  const onClickGetAppliances = (e) => {
    const updatedProducts = allProducts.filter(
      (product) => product.category === "Appliances"
    );
    setProducts(updatedProducts);
  };

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

  //Getting Products
  const productItems = async () => {
    let response = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/myProducts/getProducts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok == true) {
      const data = await response.json();
      setProducts(data.products);
      setAllProducts(data.products);
      setLoading(false);
    }
  };

  useEffect(() => {
    productItems();
  }, []);

  if (loading) {
    return (
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

  return (
    <div className='bg-container'>
      <div className='w-custom mx-auto py-2'>
        <div className='bg-white h-32 flex items-center products-container mx-auto rounded-lg get-category-products'>
          <div className=' flex  justify-center products-container mx-auto w-96 p-4 mt-2'>
            <button
              className='mx-14 mt-5 w-28 rounded-md flex flex-col items-center'
              onClick={onClickGetAllProducts}
            >
              All Products
            </button>
            <button className='mx-14' onClick={onClickGetElectronics}>
              <img
                src='https://rukminim2.flixcart.com/fk-p-flap/72/72/image/4da1d0d19350cc84.jpg?q=100'
                alt='Electronics'
                className='w-full'
              />
              Electronics
            </button>
            <button className='mx-14' onClick={onClickGetMobiles}>
              <img
                src='https://rukminim2.flixcart.com/flap/72/72/image/22fddf3c7da4c4f4.png?q=100'
                alt='Mobiles'
              />
              Mobiles
            </button>
            <button className='mx-14' onClick={onClickGetGrocery}>
              <img
                src='https://rukminim2.flixcart.com/flap/72/72/image/29327f40e9c4d26b.png?q=100'
                alt='Grocery'
              />
              Grocery
            </button>
            <button className='mx-14' onClick={onClickGetFashion}>
              <img
                src='https://rukminim2.flixcart.com/fk-p-flap/72/72/image/9d4e9c605fc1d2d3.jpg?q=100'
                alt='Fashion'
                className='w-full rounded-md'
              />
              Fashion
            </button>
            <button className='mx-14' onClick={onClickGetAppliances}>
              <img
                src='https://rukminim2.flixcart.com/fk-p-flap/72/72/image/0139228b2f7eb413.jpg?q=100'
                alt='Appliances'
              />
              Appliances
            </button>
          </div>
        </div>
        {/* flipkart products */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-10 gap-2'>
          {products.map((product) => (
            <div key={product._id} className=''>
              <div className='product-card p-4 h-auto space-y-6'>
                <HoverCard>
                  <HoverCardTrigger className='relative group'>
                    <div className='h-52'>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-full object-contain'
                      />
                    </div>

                    <div className='absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 bg-gray-800 bg-opacity-50 transition-opacity duration-300 rounded-md'>
                      {/* Heart Icon */}
                      <button
                        className='bg-white p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors duration-200'
                        onClick={() => {
                          addFavoriteItems(
                            product.productId,
                            product.title,
                            product.image,
                            product.price
                          );
                        }}
                      >
                        <GrFavorite className='w-6 h-6' />
                      </button>
                      {/* Cart Icon */}
                      <button
                        className='bg-white p-2 rounded-full text-gray-700 hover:text-green-500 transition-colors duration-200'
                        onClick={() => {
                          onClickToAddCart(
                            product.productId,
                            product.title,
                            product.price,
                            product.image
                          );
                        }}
                      >
                        <ShoppingCart className='w-6 h-6' />
                      </button>
                    </div>
                  </HoverCardTrigger>
                </HoverCard>

                <div>
                  <p
                    className='font-bold w-52 h-12 line-clamp-2 overflow-hidden cursor-pointer'
                    onClick={() => {
                      goToProduct(product._id);
                    }}
                  >
                    {product.title}
                  </p>
                </div>
                <div>
                  <h1 className='text-homePrimary font-bold'>
                    Rs.{product.price}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
