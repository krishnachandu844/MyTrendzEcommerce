import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onClickSignUp = async () => {
    console.log(password);
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
      navigate("/home");
    } else {
      console.log("Error");
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
    <div className='flex justify-center items-center h-dvh sign-up-container'>
      <div className='card  max-w-md w-1/2 rounded-lg p-6 shadow-xl'>
        <h1 className='text-3xl font-semibold mb-2'>Create an account</h1>
        <p className='text-sm'>Enter your details to get started</p>
        <div className='mt-10'>
          <div className='space-y-2'>
            <label htmlFor='name' className='heading-text-color font-medium'>
              Name
            </label>
            <input
              type='text'
              name=''
              id='name'
              className='mt-3 w-full focus:outline-none h-10 input-color rounded-md'
              placeholder='John Doe'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={username}
              onBlur={(e) => handleBlur("username", e.target.value)}
            />
            {usernameError && (
              <p className='text-red-500 font-bold text-sm'>*Required</p>
            )}
          </div>
          <br />
          <div className='space-y-2'>
            <label htmlFor='email' className='heading-text-color font-medium'>
              Email
            </label>
            <input
              type='email'
              name=''
              id='email'
              className='mt-3 w-full focus:outline-none h-10 input-color rounded-md'
              placeholder='m@Example.com'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              onBlur={(e) => handleBlur("email", e.target.value)}
            />
            {emailError && (
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
              onClick={onClickSignUp}
            >
              Create Account
            </button>
          </div>
          <p className='mt-4 text-center'>
            Already have an account ? <a href='/login'>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
