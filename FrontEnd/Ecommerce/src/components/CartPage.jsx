import Cookies from "js-cookie";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export default function CartPage() {
  const [cartProducts, setCartProduct] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  //increment and decrement quantity
  const onIncrement = async (id) => {
    const updatedProductsQuantity = cartProducts.map((cart) =>
      cart._id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
    );
    setCartProduct(updatedProductsQuantity);
    const updatedCart = updatedProductsQuantity.find((cart) => cart._id === id);
    let res = await fetch("http://localhost:3000/cart/updateQuantity/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: updatedCart.quantity }),
    });
  };
  const onDecrement = async (id) => {
    const updatedProductsQuantity = cartProducts.map((cart) =>
      cart._id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
    );

    const updatedCart = updatedProductsQuantity.find((cart) => cart._id === id);
    if (updatedCart.quantity === 0) {
      alert("Atleast It should be onr item");
      return;
    } else {
      setCartProduct(updatedProductsQuantity);
      let res = await fetch("http://localhost:3000/cart/updateQuantity/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: updatedCart.quantity }),
      });
    }
  };

  //Getting cart items
  const init = async () => {
    let response = await fetch("http://localhost:3000/cartItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setCartProduct(data.cart);
  };

  //Deleting cart
  const deleteCart = async (cartId, dbCartId) => {
    let res = await fetch("http://localhost:3000/cart/" + dbCartId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok == true) {
      let updatedCartItems = cartProducts.filter(
        (cartItem) => cartItem._id !== dbCartId
      );
      setCartProduct(updatedCartItems);
    }
  };

  useEffect(() => {
    init();
  }, []);

  //getting total price
  useEffect(() => {
    if (cartProducts) {
      let cost = cartProducts.reduce(
        (acc, cart) => acc + cart.price * cart.quantity,
        0
      );
      setTotalPrice(cost);
    }
  }, [cartProducts]);

  return cartProducts ? (
    <div className='bg-container'>
      <div className='cart-container mx-auto'>
        <h1 className='text-4xl pt-3 pb-4 font-bold'>Your Cart</h1>
        <div className='cart-card space-y-4 min-h-screen'>
          {cartProducts &&
            cartProducts.map((cartProduct) => (
              <div
                className='card bg-white shadow-lg w-5/6 h-44 rounded-2xl p-4 flex gap-6'
                key={cartProduct._id}
              >
                <div className='cart-image-container rounded-lg '>
                  <img
                    src={cartProduct.image}
                    alt={cartProduct.title}
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='w-96'>
                  <h1 className='text-2xl h-3/4 font-bold'>
                    {cartProduct.title}
                  </h1>
                  <h4 className='h-full product-heading font-bold text-xl'>
                    ${cartProduct.price}
                  </h4>
                </div>
                <div className='flex gap-6 items-center'>
                  <div className='hover:bg-slate-200'>
                    <button
                      className=' btn'
                      onClick={() => {
                        onDecrement(cartProduct._id);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div>{cartProduct.quantity}</div>
                  <div className='hover:bg-slate-200'>
                    <button
                      className='btn'
                      onClick={() => {
                        onIncrement(cartProduct._id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='delete-button flex items-center ml-5'>
                  <button
                    className='hover:bg-slate-200 h-12 w-16 pl-5 pb-1 rounded-lg'
                    onClick={() => {
                      deleteCart(cartProduct.id, cartProduct._id);
                    }}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='total-bill-count bg-white h-44 w-96 shadow-lg rounded-lg p-4 sticky bottom-0 right-0 ml-auto m-10'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Total</h1>
          <h1 className='text-xl product-heading font-bold'>${totalPrice}</h1>
        </div>
        <div className='w-full mt-11'>
          <button
            className='sign-up-button w-full h-10 rounded-md'
            onClick={() => {
              navigate(`/Billing/${totalPrice}`);
            }}
          >
            Proceed to CheckOut
          </button>
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
