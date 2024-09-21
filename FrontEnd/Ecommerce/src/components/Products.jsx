import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

export default function Products() {
  const token = Cookies.get("token");
  const { cartItems, setCartItems } = useContext(CartContext);

  const [products, setProducts] = useState();
  const navigate = useNavigate();

  //onClicking We go to single product
  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  //Adding to Cart
  const onClickToAddCart = async (productId, title, price, image) => {
    const cartData = { productId, title, price, image, quantity: 1 };
    console.log(cartItems);
    if (cartItems && cartItems.length > 0) {
      const isCartPresent = cartItems.find(
        (cart) => cart.productId === productId
      );
      console.log(isCartPresent);
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
        // Add new product to cart if it doesn't exist
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

        // Add the returned item (with _id) to the cart
        setCartItems([{ ...data.newCartItem, quantity: 1 }]);

        toast.info("Added to cart", {
          position: "bottom-right",
        });
      }
    }
  };

  //Getting Products
  const init = async () => {
    let response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });

    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    init();
  }, []);

  return products ? (
    <div className='bg-container'>
      <div className='products-container mx-auto'>
        <h1 className='text-5xl font-extrabold mb-6 pt-6'>Our Products</h1>
        <div className='product-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products &&
            products.map((product) => (
              <div className='card shadow-lg rounded-xl p-8' key={product.id}>
                <div
                  className=' w-full h-56 mb-4 flex items-center justify-center overflow-hidden rounded-lg'
                  onClick={() => {
                    goToProduct(product.id);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='h-48'>
                  <div className='h-36'>
                    <h2 className='text-xl font-bold mt-2 mb-2'>
                      {product.title}
                    </h2>
                  </div>

                  <h2 className='text-lg font-extrabold product-heading  '>
                    ${product.price}
                  </h2>
                </div>
                <div className='w-full mt-5'>
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
                </div>
              </div>
            ))}
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
