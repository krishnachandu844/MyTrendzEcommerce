import { useState } from "react";
import Cookies from "js-cookie";
import Rectangle from "../../assets/Rectangle.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  //password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onClickSignUp = async () => {
    if (username === "" && password === "" && email === "") {
      return toast.error("Type Something in fields", {
        position: "bottom-right",
      });
    }
    let response = await fetch(
      `${import.meta.env.VITE_FRONT_END_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );
    if (response.ok === true) {
      const data = await response.json();
      Cookies.set("token", data.token, { expires: 1 });
      toast.info("User created successfully", {
        position: "bottom-right",
      });
      navigate("/login");
    } else {
      const data = await response.json();
      if (data.errors) {
        data.errors.map((error) =>
          toast.error(`${error.message}`, {
            position: "bottom-right",
          })
        );
      } else {
        toast.error(`${data.message}`, { position: "bottom-right" });
      }
    }
  };

  const handleBlur = (field, value) => {
    // Validate fields on blur
    if (field === "username" && value.trim() === "") {
      setUsernameError(true);
    } else if (field === "email" && value.trim() === "") {
      setEmailError(true);
    } else if (field === "password" && value.trim() === "") {
      setPasswordError(true);
    }
  };

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
            <Input
              type='text'
              id='username'
              className='w-full'
              placeholder='John Doe'
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onBlur={(e) => handleBlur("username", e.target.value)}
            />
            {usernameError && (
              <p className='text-red-500 font-bold text-sm'>*Required</p>
            )}
          </div>
          <div className='space-y-2 mt-4'>
            <Label htmlFor='Email'>Email address</Label>
            <Input
              type='text'
              id='Email'
              className='w-full'
              placeholder='m@Example.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={(e) => handleBlur("email", e.target.value)}
            />
            {emailError && (
              <p className='text-red-500 font-bold text-sm'>*Required</p>
            )}
          </div>
          <div className='space-y-2 mt-4 relative'>
            <Label htmlFor='Password'>Password</Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              id='Password'
              className='w-full'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={(e) => handleBlur("password", e.target.value)}
            />
            <button
              className={`${
                passwordError
                  ? "absolute inset-y-0  right-0 -top-2  flex items-center px-3  text-gray-500 text-xl"
                  : "absolute inset-y-0 h-full right-0 pt-4 flex items-center px-3  text-gray-500 text-xl"
              }`}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <MdOutlineVisibility />
              ) : (
                <MdOutlineVisibilityOff />
              )}
            </button>
            {passwordError && (
              <p className='text-red-500 font-bold text-sm'>*Required</p>
            )}
          </div>
        </div>
        <p className='text-sm my-4'>
          Already have an account?
          <span
            className='font-medium text-black hover:font-bold cursor-pointer'
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
        <div className='mt-5 w-96'>
          <Button className='w-full' onClick={onClickSignUp}>
            Create an account
          </Button>
        </div>
      </div>
    </div>
  );
}
