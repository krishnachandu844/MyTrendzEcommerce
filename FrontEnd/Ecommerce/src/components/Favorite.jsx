import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState();
  const [cartProducts, setCartProduct] = useState(undefined);
  const token = Cookies.get("token");

  // Getting cart Items
  const cartItems = async () => {
    let response = await fetch("http://localhost:3000/cart/cartItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setCartProduct(data.cart);
  };

  useEffect(() => {
    cartItems();
  }, []);

  // onClick to add Cart and update quantity if the cart item is already present
  const onClickToAddCart = async (productId, title, price, image) => {
    const cartData = { productId, title, price, image };
    console.log(productId);
    const isCartPresent = cartProducts.find(
      (cart) => cart.productId === productId
    );
    console.log(isCartPresent);

    if (isCartPresent) {
      const updatedProductsQuantity = cartProducts.map((cart) =>
        cart.productId === productId
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart
      );
      setCartProduct(updatedProductsQuantity);

      const updatedCart = updatedProductsQuantity.find(
        (cart) => cart.productId === productId
      );
      let res = await fetch(
        "http://localhost:3000/cart/updateQuantity/" + updatedCart._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: updatedCart.quantity }),
        }
      );
      toast.info("Updated Quantity", {
        position: "bottom-right",
      });
      if (!res.ok) {
        console.log("Error updating quantity");
      }
    } else {
      const res = await fetch("http://localhost:3000/cart/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });
      if (res.ok === true) {
        toast.info("Added to cart", {
          position: "bottom-right",
        });
      } else {
        console.log("Error");
      }
    }
  };

  //Deleting the favorite Item

  const deleteFavoriteItem = async (id) => {
    const res = await fetch(
      "http://localhost:3000/favorite/deleteFavoriteItems/" + id,
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
    } else {
      console.log("Error");
    }
  };

  // getting favorite items
  const init = async () => {
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
    init();
  }, []);

  return favoriteItems && favoriteItems.length !== 0 ? (
    <div className='bg-container min-h-screen'>
      <div className='products-container mx-auto'>
        <h2 className='text-4xl font-bold pt-4 pb-4'>Favorites</h2>
        <div className='product-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {favoriteItems &&
            favoriteItems.map((item) => (
              <div className='card shadow-lg rounded-xl p-8' key={item._id}>
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

                  <h2 className='text-lg font-extrabold product-heading  '>
                    ${item.price}
                  </h2>
                </div>
                <div className='w-full mt-2 mb-1 flex justify-between '>
                  <button
                    variant='outline'
                    size='icon'
                    aria-label='Remove from favorites'
                    className='text-gray-500 hover:text-red-500 hover:border-red-500 flex justify-center text-xl'
                    onClick={() => {
                      deleteFavoriteItem(item._id);
                    }}
                  >
                    <Trash2 className='h-7 w-7' />
                    <p className='pt-1 pl-2'>Delete</p>
                  </button>
                  <button
                    className='sign-up-button w-1/2 h-10 rounded-md flex items-center justify-center'
                    onClick={() => {
                      onClickToAddCart(
                        item.productId,
                        item.title,
                        item.price,
                        item.image
                      );
                    }}
                  >
                    <ShoppingCart className='h-6 w-6 mr-3' />
                    Add to Cart
                  </button>
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
          Looks like you haven't added anything to your cart yet. Let's change
          that!
        </p>
        <div className='mt-6'>
          <Link
            to='/products'
            className='inline-flex items-center rounded-md  px-4 py-2 text-sm font-medium  shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-black text-white'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
