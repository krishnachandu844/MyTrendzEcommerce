import { ShoppingBag, Home, Grid, PhoneCall, Search } from "lucide-react";
export default function NotFoundPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='max-w-md w-full space-y-8 text-center -mt-0.5'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjDk7Q6b2BDpc0v2LFJlEjyYUDncgq_D9nQ&s'
          alt=''
          className='w-full h-full'
        />
        <div className='mt-6'>
          <a
            href='/home'
            className='inline-flex items-center rounded-md  px-4 py-2 text-sm font-medium   bg-homePrimary text-white'
          >
            GO TO HOME
          </a>
        </div>
      </div>
    </div>
  );
}
