import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      image: "https://a.media-amazon.com/images/I/61VuVU94RnL._AC_UY218_.jpg",
      title: "Apple iPhone 13 (128GB) - Midnight",
      price: 128,
    },
    {
      id: 2,
      image: "https://a.media-amazon.com/images/I/61pwYY8Hp7L._AC_UL320_.jpg",
      title: "CeraVe Hydrating Cleanser",
      price: 35,
    },
    {
      id: 3,
      image: "https://a.media-amazon.com/images/I/61WswLTIRqL._AC_UL320_.jpg",
      title: "Men Long Sleeve Shirt",
      price: 25,
    },
    {
      id: 4,
      image: "https://a.media-amazon.com/images/I/51PQfSwIqyL._AC_UY218_.jpg",
      title: "POCO C65 (Matte Black 4GB RAM 128GB Storage)",
      price: 68,
    },
  ];
  return (
    <>
      <div className='products-container mx-auto'>
        <main className='flex-1 flex flex-col items-center justify-center'>
          <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white h-screen'>
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                    Welcome to MyStore
                  </h1>
                  <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                    Discover our latest collection of premium products.
                  </p>
                </div>
                <div className='space-x-4'>
                  <button
                    className='sign-up-button h-12 w-28 rounded-lg'
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    Shop Now
                  </button>
                  <button
                    variant='outline'
                    className='bg-gray-50 h-12 w-28 rounded-lg'
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* products section */}
        <section className='w-full py-12 md:py-24 lg:py-32  bg-gray-50 h-screen flex flex-col items-center justify-center'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              Featured Products
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='ml-4 shadow-lg flex flex-col items-center justify-center p-5 rounded-lg'
                >
                  <div className='p-4 h-4/5 w-full bg-white'>
                    <img
                      alt={product.title}
                      className='w-full h-full object-contain'
                      src={product.image}
                    />
                  </div>
                  <div className='flex flex-col items-start'>
                    <div className='text-lg font-bold'>{product.title}</div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      ${product.price}
                    </p>
                    <button className='mt-2 w-32 rounded-lg sign-up-button h-8'>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* about section */}
      <section className='w-full py-12 md:py-24 lg:py-32 h-screen flex flex-col items-center justify-center'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 items-center'>
            <div className='flex flex-col justify-center space-y-8 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  About MyStore
                </h2>
                <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto'>
                  We're passionate about delivering quality products and
                  exceptional customer experiences.
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='w-5 h-5 text-green-500' />
                <span className='font-medium'>Premium Quality</span>
              </div>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='w-5 h-5 text-green-500' />
                <span className='font-medium'>Fast Shipping</span>
              </div>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='w-5 h-5 text-green-500' />
                <span className='font-medium'>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer secion */}
      <footer className='w-full border-t bg-background'>
        <div className=' flex flex-col items-center justify-between space-y-4 py-10 md:h-16 md:flex-row md:py-0'>
          <div className='flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
            <a href='/'>Terms of Service</a>
            <a href='/'>Privacy Policy</a>
          </div>
          <div className='flex items-center space-x-4'>
            <a href='/'>
              <span className='sr-only'>Facebook</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a href='/'>
              <span className='sr-only'>Twitter</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </a>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            © {new Date().getFullYear()} MyTrends. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
