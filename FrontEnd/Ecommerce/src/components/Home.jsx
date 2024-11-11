import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Clothing from "../../assets/HomSectionImages/Clothing.jpg";
import Jeweller from "../../assets/HomSectionImages/Jeweller.jpg";
import Watches from "../../assets/HomSectionImages/Watches.jpg";
import HomeFrame from "../../assets/HomSectionImages/HomeFrame.jpg";
import MobileFrame from "../../assets/HomSectionImages/MobileFrame.jpg";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../App.css";

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
    // <div className=''>
    //   {/* home section */}
    //   <div className='w-full home-page-bg-img flex items-center justify-center mobile:w-screen mobile:bg-black '>
    //     <div className='flex flex-col items-center space-y-4 text-center '>
    //       <div className=' '>
    //         <div className='space-y-2'>
    //           <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none home-page-head'>
    //             Welcome to MyTrendz
    //           </h1>
    //           <p className='mx-auto max-w-[700px] text-xl font-bold text-white '>
    //             Discover our latest collection of premium products.
    //           </p>
    //         </div>
    //         <div className='space-x-4 mt-2'>
    //           <Button
    //             onClick={() => {
    //               navigate("/products");
    //             }}
    //           >
    //             Shop Now
    //           </Button>
    //           <Button variant='outline'>Learn More</Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/**Items-section */}

    //     {/** Feature Brands */}

    //     <h3 className='text-homePrimary font-bold text-4xl my-6 ml-6'>
    //       Featured Brands
    //     </h3>
    //     <div className='flex gap-4 p-4 h-96 mobile:h-auto mobile:space-y-4 mobile:flex-col'>
    //       <div>
    //         <img
    //           src='https://rukminim2.flixcart.com/fk-p-flap/450/280/image/935d8f0319677e1f.jpeg?q=20'
    //           alt=''
    //         />
    //       </div>
    //       <div>
    //         <img
    //           src='https://rukminim2.flixcart.com/fk-p-flap/450/280/image/bf686dbb1fa860c2.jpeg?q=20'
    //           alt=''
    //         />
    //       </div>
    //       <div>
    //         <img
    //           src='https://rukminim2.flixcart.com/fk-p-flap/450/280/image/dfb9097f8ee066af.jpeg?q=20'
    //           alt=''
    //         />
    //       </div>
    //       <div>
    //         <img
    //           src='https://rukminim2.flixcart.com/fk-p-flap/450/280/image/70c391b99dc5a210.jpeg?q=20'
    //           alt=''
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {/* about section */}
    //   <section className='w-full py-12  h-screen flex flex-col items-center justify-center bg-gray-100'>
    //     <div className='container px-4 md:px-6'>
    //       <div className='grid gap-6 items-center'>
    //         <div className='flex flex-col justify-center space-y-8 text-center '>
    //           <div className='space-y-4'>
    //             <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
    //               About MyStore
    //             </h2>
    //             <p className='max-w-[600px] text-500 text-xl mx-auto'>
    //               We're passionate about delivering quality products and
    //               exceptional customer experiences.
    //             </p>
    //           </div>
    //         </div>
    //         <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
    //           <div className='flex items-center space-x-2'>
    //             <CheckCircle className='w-5 h-5 text-green-500' />
    //             <span className='font-medium'>Premium Quality</span>
    //           </div>
    //           <div className='flex items-center space-x-2'>
    //             <CheckCircle className='w-5 h-5 text-green-500' />
    //             <span className='font-medium'>Fast Shipping</span>
    //           </div>
    //           <div className='flex items-center space-x-2'>
    //             <CheckCircle className='w-5 h-5 text-green-500' />
    //             <span className='font-medium'>24/7 Support</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* footer secion */}
    //   <footer className='w-full border-t bg-homePrimary text-white h-28 '>
    //     <div className=' flex flex-col items-center justify-between space-y-4 py-10 md:h-16 md:flex-row md:py-0 mt-5'>
    //       <div className='flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
    //         <a href='/'>Terms of Service</a>
    //         <a href='/'>Privacy Policy</a>
    //       </div>
    //       <div className='flex items-center space-x-4'>
    //         <a href='/'>
    //           <span className='sr-only'>Facebook</span>
    //           <svg
    //             className='h-6 w-6'
    //             fill='currentColor'
    //             viewBox='0 0 24 24'
    //             aria-hidden='true'
    //           >
    //             <path
    //               fillRule='evenodd'
    //               d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
    //               clipRule='evenodd'
    //             />
    //           </svg>
    //         </a>
    //         <a href='/'>
    //           <span className='sr-only'>Twitter</span>
    //           <svg
    //             className='h-6 w-6'
    //             fill='currentColor'
    //             viewBox='0 0 24 24'
    //             aria-hidden='true'
    //           >
    //             <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
    //           </svg>
    //         </a>
    //       </div>
    //       <p className='text-sm text-white'>
    //         © {new Date().getFullYear()} MyTrends. All rights reserved.
    //       </p>
    //     </div>
    //   </footer>
    // </div>
    // <main className='h-screen flex-1'>
    //   <section className='w-full h-full bg-red-400'>
    //     <div className='home-page-bg-img w-full h-full'></div>
    //   </section>
    // </main>
    // <div className='home-page-bg-img'></div>
    <main>
      <div className='home-gradient'>
        <div className='max-w-[1200px] mx-auto'>
          {/* hero-section */}
          <section className='flex flex-col items-center justify-center h-screen space-y-3'>
            <h1 className='lg:text-6xl md:text-5xl text-4xl font-bold text-[#03045e]'>
              Welcome to my Trendz
            </h1>
            <p className='md:text-xl text-white italic'>
              Discover our latest collection of premium products
            </p>
            <div className='space-x-4'>
              <Button>Shop Now</Button>
              <Button variant='outline'>Learn More</Button>
            </div>
          </section>
          {/* items-section */}
          <section className=' md:pl-24 px-3 space-y-5 py-5'>
            <div>
              <h1 className='text-3xl uppercase font-bold text-[#03045e]'>
                Categories
              </h1>
            </div>
            <div className='grid grid-cols-12 gap-4 '>
              <img
                src={Watches}
                alt=''
                className='rounded-md md:col-span-4 col-span-12'
              />

              <img
                src={Jeweller}
                alt=''
                className='rounded-md md:col-span-4 col-span-12'
              />

              <img
                src={Clothing}
                alt=''
                className='rounded-md md:col-span-4 col-span-12'
              />
            </div>
          </section>
          {/* mobile-section */}
          <section className=' md:pl-24 px-3 space-y-5 py-5'>
            <img
              src={MobileFrame}
              alt=''
              className='p-2 rounded-lg object-contain mobile:w-full'
            />
          </section>
          {/* products-section */}
          <section className=' md:pl-24 px-3 space-y-6 py-5'>
            <div>
              <h1 className='text-3xl uppercase font-bold text-[#03045e] py-2'>
                Today Deals
              </h1>
              <div className='grid grid-cols-12 gap-4'>
                {/* card-1 */}
                <motion.Card className='shadow-lg w-full bg-white text-center md:w-80 flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-6 lg:w-full'>
                  <CardHeader>
                    <CardTitle>
                      <div className=' rounded-md h-56 w-full'>
                        <img
                          src='https://rukminim2.flixcart.com/image/612/612/jwgple80/watch/p/y/f/bq1126-fossil-original-imafh4ybgqgehxez.jpeg?q=70'
                          alt=''
                          className=' w-full h-full object-contain'
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className=' h-32 space-y-4'>
                      <p className='text-[#0d47a1] font-bold text-3xl'>
                        Flynn Analog Watch
                      </p>
                      <p className='text-black font-medium line-clamp-2'>
                        This is a genuine Fossil product. The product comes with
                        a standard brand warranty of 2 Years.
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-[#0582ca] font-bold'>Rs.5,689</p>
                      <Button className='bg-[#0582ca] hover:bg-[#0d47a1]'>
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </motion.Card>
                {/* Card-2 */}
                <Card className='shadow-lg w-full text-center md:w-80 flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-6 lg:w-full'>
                  <CardHeader>
                    <CardTitle>
                      <div className=' rounded-md h-56 w-full'>
                        <img
                          src='https:rukminim2.flixcart.com/image/312/312/xif0q/mobile/c/v/p/-original-imah4jyfcjgcghqs.jpeg?q=70'
                          alt=''
                          className=' w-full h-full object-contain'
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className=' h-32 space-y-4'>
                      <p className='text-[#0d47a1] font-bold text-xl '>
                        Apple iPhone 16 (Pink, 128 GB)
                      </p>
                      <p className='text-black font-medium line-clamp-2'>
                        The iPhone 16 introduces a new Camera Control button
                        that enhances photo and video settings with customizable
                        gestures.
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-[#0d47a1] font-bold'>Rs.79,900</p>
                      <Button className='bg-[#0582ca] hover:bg-[#0d47a1]'>
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* Card-3 */}
                <Card className='shadow-lg w-full text-center md:w-80 flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-6 lg:w-full'>
                  <CardHeader>
                    <CardTitle>
                      <div className=' rounded-md h-56 w-full'>
                        <img
                          src='https:rukminim2.flixcart.com/image/312/312/xif0q/television/i/8/0/-original-imah2dzwa44rbqds.jpeg?q=70'
                          alt=''
                          className=' w-full h-full object-contain'
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className=' h-32 space-y-4'>
                      <p className='text-[#0d47a1] font-bold text-xl '>
                        SONY Bravia 2 125.7 cm (50 inch) Ultra HD (4K)
                      </p>
                      <p className='text-black font-medium line-clamp-2'>
                        This Sony Bravia Ultra HD 4K TV is integrated with
                        Google TV offering you endless entertainment all through
                        the day.
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-[#0d47a1] font-bold'>Rs.53,990</p>
                      <Button className='bg-[#0582ca] hover:bg-[#0d47a1]'>
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* Card-4 */}
                <Card className='shadow-lg w-full text-center md:w-80 flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-6 lg:w-full'>
                  <CardHeader>
                    <CardTitle>
                      <div className=' rounded-md h-56 w-full'>
                        <img
                          src='https:rukminim2.flixcart.com/image/312/312/xif0q/computer/k/2/u/-original-imah3zzjkjwumecn.jpeg?q=70'
                          alt=''
                          className=' w-full h-full object-contain'
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className=' h-32 space-y-4'>
                      <p className='text-[#0d47a1] font-bold text-xl '>
                        Acer Aspire 7 Intel Core i5 13th Gen 13420H
                      </p>
                      <p className='text-black font-medium line-clamp-2'>
                        The Acer Aspire 7 gaming laptop combines powerful
                        performance with sleek portability.
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-[#0d47a1] font-bold'>Rs.57,990</p>
                      <Button className='bg-[#0582ca] hover:bg-[#0d47a1]'>
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          {/* about-section */}
          <section className=' md:pl-24 h-screen grid items-center'>
            <div className='container px-4 md:px-6'>
              <div className='grid gap-6 items-center'>
                <div className='flex flex-col justify-center space-y-8 text-center '>
                  <div className='space-y-4'>
                    <h2 className='text-5xl font-bold tracking-tighter sm:text-5xl text-[#002D62]'>
                      About MyStore
                    </h2>
                    <p className='max-w-[600px]  sm:text-xl mx-auto text-[#002D62]'>
                      We're passionate about delivering quality products and
                      exceptional customer experiences.
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
                  <div className='flex items-center space-x-2 text-[#002D62]'>
                    <CheckCircle className='w-5 h-5 text-[#002D62]' />
                    <span className='font-medium '>Premium Quality</span>
                  </div>
                  <div className='flex items-center space-x-2 text-[#002D62]'>
                    <CheckCircle className='w-5 h-5 ' />
                    <span className='font-medium'>Fast Shipping</span>
                  </div>
                  <div className='flex items-center space-x-2 text-[#002D62]'>
                    <CheckCircle className='w-5 h-5 ' />
                    <span className='font-medium'>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* footer-section */}
        </div>
        {/* <section className='w-full  bg-[#002D72] text-white h-28 '>
          <div className=' flex flex-col items-center justify-between space-y-4 py-10 md:h-16 w-[1200px] mx-auto md:flex-row md:py-0 mt-5'>
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
            <p className='text-sm text-white'>
              © {new Date().getFullYear()} MyTrends. All rights reserved.
            </p>
          </div>
        </section> */}
        {/* <section className='w-full h-24 bg-[#002D72] flex items-center'>
          <div className='text-white flex items-center justify-between w-[1200px] mx-auto'>
            <div>
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
            <p className='text-sm text-white'>
              © {new Date().getFullYear()} MyTrends. All rights reserved.
            </p>
          </div>
        </section> */}
        <section className='w-full h-60 bg-[#002D72] text-white flex flex-col items-center pt-6 gap-6 md:h-24 '>
          <div className='flex flex-col items-center pt-6 gap-6 md:w-[1200px] mx-auto md:flex-row md:justify-between md:pt-4'>
            <div className=' flex gap-2'>
              <a href=''>Terms of Services</a>
              <a href=''>Privacy Policy</a>
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
            <p className='text-sm '>
              © {new Date().getFullYear()} MyTrends. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
