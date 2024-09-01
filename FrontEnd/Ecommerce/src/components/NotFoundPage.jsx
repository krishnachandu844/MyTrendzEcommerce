import { ShoppingBag, Home, Grid, PhoneCall, Search } from "lucide-react";
export default function NotFoundPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='max-w-md w-full space-y-8 text-center -mt-0.5'>
        <ShoppingBag className='mx-auto h-12 w-12' />
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
        <p className='text-xl'>
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
