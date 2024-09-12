import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState();
  const token = Cookies.get("token");

  // onClick to add Cart
  const onClickToAddCart = async (id, title, price, image) => {
    const cartData = { id, title, price, image };
    const res = await fetch("http://localhost:3000/cart/addCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cartData),
    });
    if (res.ok === true) {
      console.log("Added Successfully");
    } else {
      console.log("Error");
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
      console.log(updatedFavoriteItems);
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
      console.log(data);
      setFavoriteItems(data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
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
                        item.id,
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
  );
}
