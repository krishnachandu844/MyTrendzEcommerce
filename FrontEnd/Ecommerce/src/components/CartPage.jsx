import { Trash2 } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { CartContext } from "../context/cartContext";

export default function CartPage() {
  const { cartItems, setCartItems, token } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  //increment and decrement quantity
  const onIncrement = async (id) => {
    const updatedProductsQuantity = cartItems.map((cart) =>
      cart._id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
    );
    setCartItems(updatedProductsQuantity);
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
    const updatedProductsQuantity = cartItems.map((cart) =>
      cart._id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
    );

    const updatedCart = updatedProductsQuantity.find((cart) => cart._id === id);
    if (updatedCart.quantity === 0) {
      alert("At least It should be one item");
      return;
    } else {
      setCartItems(updatedProductsQuantity);
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
      let updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== dbCartId
      );

      setCartItems(updatedCartItems);
    }
  };

  //getting total price
  useEffect(() => {
    if (cartItems) {
      let cost = cartItems.reduce(
        (acc, cart) => acc + cart.price * cart.quantity,
        0
      );
      setTotalPrice(cost);
    }
  }, [cartItems]);

  return cartItems ? (
    cartItems.length === 0 ? (
      <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-md text-center'>
          <div className='mx-auto h-12 w-12' />
          <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
            Your cart is empty
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
    ) : (
      <div className='bg-container'>
        <div className='cart-container mx-auto'>
          <h1 className='text-4xl pt-3 pb-4 font-bold'>Your Cart</h1>
          <div className='cart-card space-y-4 min-h-screen'>
            {cartItems &&
              cartItems.map((cartProduct) => (
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
            <h1 className='text-xl product-heading font-bold'>
              ${parseFloat(totalPrice.toFixed(2))}
            </h1>
          </div>
          <div className='w-full mt-11'>
            <button
              className='sign-up-button w-full h-10 rounded-md'
              onClick={() => {
                navigate(`/Billing/${parseFloat(totalPrice.toFixed(2))}`);
              }}
            >
              Proceed to CheckOut
            </button>
          </div>
        </div>
      </div>
    )
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
