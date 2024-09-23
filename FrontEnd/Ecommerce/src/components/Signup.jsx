import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
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
    let response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
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
    <div className='flex justify-center items-center h-screen sign-up-container'>
      <Card className='w-2/6 h-auto'>
        <CardHeader className='text-center space-y-2'>
          <CardTitle className='text-3xl'>Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Label htmlFor='name' className='heading-text-color font-medium'>
              Name
            </Label>
            <Input
              type='text'
              name=''
              id='name'
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
          <br />
          <div className='space-y-2'>
            <Label htmlFor='email' className='heading-text-color font-medium'>
              Email
            </Label>
            <Input
              type='email'
              name=''
              id='email'
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
          <br />
          <div className='space-y-2 relative'>
            <Label
              htmlFor='password'
              className='heading-text-color font-medium '
            >
              Password
            </Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              name=''
              id='password'
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
          <div className='mt-10'>
            <Button
              className='sign-up-button w-full h-10 rounded-md'
              onClick={onClickSignUp}
            >
              Create Account
            </Button>
          </div>
          <p className='mt-4 text-center'>
            Already have an account ?{" "}
            <a href='/login' className='hover:font-bold'>
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
