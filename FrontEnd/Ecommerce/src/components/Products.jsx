import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Products() {
  const token = Cookies.get("token");
  const { cartItems, setCartItems } = useContext(CartContext);

  // const [products, setProducts] = useState();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

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
  // const onClickToAddCart = async (productId, title, price, image) => {
  //   const cartData = { productId, title, price, image, quantity: 1 };
  //   console.log(cartItems);
  //   if (cartItems && cartItems.length > 0) {
  //     const isCartPresent = cartItems.find(
  //       (cart) => cart.productId === productId
  //     );
  //     console.log(isCartPresent);
  //     if (isCartPresent) {
  //       // Update quantity if product exists in the cart
  //       const updatedProductsQuantity = cartItems.map((cart) =>
  //         cart.productId === productId
  //           ? { ...cart, quantity: cart.quantity + 1 }
  //           : cart
  //       );
  //       setCartItems(updatedProductsQuantity);

  //       const updatedCart = updatedProductsQuantity.find(
  //         (cart) => cart.productId === productId
  //       );

  //       // Use `_id` to update cart item on the server
  //       let res = await fetch(
  //         `http://localhost:3000/cart/updateQuantity/${updatedCart._id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({ quantity: updatedCart.quantity }),
  //         }
  //       );

  //       if (res.ok) {
  //         toast.info("Updated Quantity", {
  //           position: "bottom-right",
  //         });
  //       } else {
  //         console.error("Failed to update the cart on the server");
  //       }
  //     } else {
  //       // Add new product to cart if it doesn't exist
  //       const res = await fetch("http://localhost:3000/cart/addCart", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(cartData),
  //       });

  //       if (res.ok) {
  //         const data = await res.json();

  //         // Add the returned item (with _id) to the cart
  //         setCartItems((prevItems) => [
  //           ...prevItems,
  //           { ...data.newCartItem, quantity: 1 },
  //         ]);

  //         toast.info("Added to cart", {
  //           position: "bottom-right",
  //         });
  //       }
  //     }
  //   } else {
  //     // If the cart is empty, add the product
  //     const res = await fetch("http://localhost:3000/cart/addCart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(cartData),
  //     });

  //     if (res.ok) {
  //       const data = await res.json();

  //       // Add the returned item (with _id) to the cart
  //       setCartItems([{ ...data.newCartItem, quantity: 1 }]);

  //       toast.info("Added to cart", {
  //         position: "bottom-right",
  //       });
  //     }
  //   }
  // };

  //Getting Products
  // const init = async () => {
  //   let response = await fetch("https://fakestoreapi.com/products", {
  //     method: "GET",
  //   });

  //   const data = await response.json();

  //   setProducts(data);
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  const productItems = async () => {
    let response = await fetch("http://localhost:3000/myProducts/getProducts", {
      method: "GET",
    });

    if (response.ok == true) {
      const data = await response.json();
      setProducts(data.products);
      setAllProducts(data.products);
    } else {
      console.log("unable to get data");
    }
  };

  useEffect(() => {
    productItems();
  }, []);

  return Products ? (
    <div className='bg-container bg-gray-100'>
      <div className='products-container mx-auto py-2'>
        <div className='bg-white h-32 flex items-center products-container mx-auto rounded-lg'>
          <div className=' flex  justify-center products-container mx-auto p-6 mt-2'>
            <button
              className='mx-14 w-28 h-24 rounded-md  hover:bg-gray-200'
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

        {/* <h1 className='text-5xl font-extrabold mb-6 pt-6'>Our Products</h1> */}
        {/* <div className='product-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
        </div> */}
        {/* flipkart products */}
        <div className='fkart-items-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2'>
          {products &&
            products.map((product) => (
              <div key={product._id}>
                <Card className='h-full'>
                  <CardHeader>
                    <div className='w-full h-56 flex items-center justify-center overflow-hidden rounded-lg'>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-full object-contain'
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='h-24'>
                      <p className='font-bold'>{product.title}</p>
                      <p className='mt-2'>Rs.{product.price}</p>
                    </div>
                    <Button className='my-4 w-full'>Add to Cart</Button>
                  </CardContent>
                </Card>
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
