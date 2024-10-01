import loginBg from "../../assets/loginBg.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const LoginDup = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
      className='flex justify-center items-center'
    >
      <Card className='shadow-md'>
        <CardHeader className='text-center space-y-2 '>
          <CardTitle className='text-3xl font-medium'>
            Login to your account
          </CardTitle>
          <CardDescription className='text-sm mt-2'>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Label htmlFor='email' className='heading-text-color font-medium'>
              Username
            </Label>
            <Input
              type='text'
              name=''
              id='email'
              placeholder='John Doe'
              //   value={username}
              //   onChange={(e) => {
              //     setUserName(e.target.value);
              //   }}
              //   onBlur={(e) => handleBlur("username", e.target.value)}
            />
            {/* {usernameError && (
              <p className='text-red-500 font-bold text-sm'>*Required</p>
            )} */}
          </div>
          <br />
          <div className='space-y-2 relative '>
            <Label
              htmlFor='password'
              className='heading-text-color font-medium'
            >
              Password
            </Label>

            <Input
              //   type={passwordVisible ? "text" : "password"}
              type='text'
              name=''
              id='password'
              //   value={password}
              //   onChange={(e) => {
              //     setPassword(e.target.value);
              //   }}
              //   onBlur={(e) => handleBlur("password", e.target.value)}
            />
            <button
            //   className={`${
            //     passwordError
            //       ? "absolute inset-y-0  right-0 -top-2 flex items-center px-3  text-gray-500 text-xl"
            //       : "absolute inset-y-0 h-full right-0 pt-4 flex items-center px-3  text-gray-500 text-xl"
            //   }`}
            //   onClick={togglePasswordVisibility}
            >
              {/* {passwordVisible ? (
                <MdOutlineVisibility />
              ) : (
                <MdOutlineVisibilityOff />
              )} */}
            </button>
            <div>
              {/* {passwordError && (
                <p className='text-red-500 font-bold text-sm mt-2'>*Required</p>
              )} */}
            </div>
          </div>

          <div className='mt-1'>
            <Button
              className='sign-up-button w-full h-10 rounded-md'
              //   onClick={onClickLogin}
            >
              Log in
            </Button>
          </div>
          <p className='mt-3 text-center text-sm'>
            Don't have an account?
            <a href='/' className='hover:font-bold'>
              signup
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginDup;
