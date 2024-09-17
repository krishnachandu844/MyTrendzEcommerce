import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const token = Cookies.get("token");
  const [cartProducts, setCartProduct] = useState(undefined);
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  //onClicking We go to single product
  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  //Getting cart Items
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
