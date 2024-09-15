import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onClickLogin = async () => {
    let response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok === true) {
      const data = await response.json();
      Cookies.set("token", data.token, { expires: 1 });
      navigate("/home");
      toast.info("Logged in successfully", {
        position: "bottom-right",
      });
    } else {
      const data = await response.json();
      toast.error(`${data.message}`, {
        position: "bottom-right",
      });
    }
  };

  const handleBlur = (field, value) => {
    // Validate fields on blur
    if (field === "username" && value.trim() === "") {
      setUsernameError(true);
    } else if (field === "password" && value.trim() === "") {
      setPasswordError(true);
    }
  };

  return (
    <div className='flex justify-center items-center h-dvh '>
      <div className='card  max-w-md w-1/2 rounded-lg p-6 shadow-lg'>
        <h1 className='text-3xl font-semibold mb-2'>Login to your account</h1>
        <p className='text-sm '>
          Enter your email and password to access your account
        </p>
        <div className='mt-10'>
          <div className='space-y-2'>
            <label htmlFor='email' className='heading-text-color font-medium'>
              Username
            </label>
            <input
              type='text'
              name=''
              id='email'
              className='mt-3 w-full focus:outline-none h-10 input-color rounded-md'
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
            <label
              htmlFor='password'
              className='heading-text-color font-medium'
            >
              Password
            </label>
            <input
              type='password'
              name=''
              id='password'
              className='mt-3 w-full  h-10 input-color rounded-md'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              onBlur={(e) => handleBlur("password", e.target.value)}
            />
            {passwordError && (
              <p className='text-red-500 font-bold text-sm'>*Required</p>
            )}
          </div>
          <div className='mt-10'>
            <button
              className='sign-up-button w-full h-10 rounded-md'
              onClick={onClickLogin}
            >
              Login
            </button>
          </div>
          <p className='mt-4 text-center'>
            Don't have an account ?{" "}
            <a href='/' className='hover:font-bold'>
              signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
