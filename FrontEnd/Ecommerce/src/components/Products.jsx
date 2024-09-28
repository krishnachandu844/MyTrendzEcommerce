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

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok == true) {
      const data = await response.json();
      setProducts(data.products);
      setAllProducts(data.products);
      setLoading(false);
    } else {
      console.log("unable to get data");
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
    <div className='bg-container bg-gray-100'>
      <div className='products-container mx-auto py-2'>
        <div className='bg-white h-32 flex items-center products-container mx-auto rounded-lg'>
          <div className=' flex  justify-center products-container mx-auto p-6 mt-2'>
            <button
              className='mx-14 w-28 rounded-md flex flex-col items-center'
              onClick={onClickGetAllProducts}
            >
              <img
                src='https://files.oaiusercontent.com/file-M6iPgj9pmgzdbdhuS7a3r5MD?se=2024-09-28T09%3A28%3A11Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D3a54e595-b147-4145-96bb-66ca805b2793.webp&sig=063ZRegwwjAGqa3zgs3jOTY6yMjxrnDlscaP22HoPfA%3D'
                className='h-20 rounded-md'
              />
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
                        onClick={() => {
                          goToProduct(product._id);
                        }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='h-24'>
                      <p className='font-bold'>{product.title}</p>
                      <p className='mt-2'>Rs.{product.price}</p>
                    </div>
                    <Button
                      className='my-4 w-full'
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
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
