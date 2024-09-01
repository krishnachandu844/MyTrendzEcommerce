import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  const onClickToAddCart = async (id, title, price, image) => {
    const cartData = { id, title, price, image };
    const res = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
    if (res.ok === true) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log(res);
    }
    // const data = await res.json();
    // navigate(`/cart/${id}`);
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
              <p className='description w-full m-2  mt-8 text-lg from-neutral-500 font-sans'>
                {product.description}
              </p>
              <div className='mt-40 flex w-11/12'>
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
                <button className='fav-btn w-28 pl-8 hover:bg-red-100 transition ml-2 rounded-lg'>
                  <svg
                    id='favoriteIcon'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-red-600'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.48 6.48 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z'
                    />
                  </svg>
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
