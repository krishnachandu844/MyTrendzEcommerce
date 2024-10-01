import Rectangle from "../../assets/Rectangle.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SignUpDup = () => {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-1/2'>
        <img src={Rectangle} alt='' className='w-full h-full object-cover' />
      </div>

      <div className=' flex flex-col items-center justify-center w-1/2 bg-white'>
        <h1 className='text-3xl font-medium'>Create an Account</h1>

        <div className='w-96 mt-8'>
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input type='text' id='username' className='w-full' />
          </div>
          <div className='space-y-2 mt-2'>
            <Label htmlFor='Email'>Email address</Label>
            <Input type='text' id='Email' className='w-full' />
          </div>
          <div className='space-y-2 mt-2'>
            <Label htmlFor='Password'>Password</Label>
            <Input type='text' id='Password' className='w-full' />
          </div>
        </div>
        <p className='text-sm my-4'>
          Already have an account?
          <span className='font-medium text-black'>Login</span>
        </p>
        <div className='mt-5 w-96'>
          <Button className='w-full'>Create an account</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpDup;
