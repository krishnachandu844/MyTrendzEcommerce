import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Product from "./components/Product";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./components/NotFoundPage";
import CartPage from "./components/CartPage";
import Billing from "./components/Billing";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorite from "./components/Favorite";
import Home from "./components/Home";

import Admin from "./components/Admin";
import SignUpDup from "./components/SignUpDup";
import LoginDup from "./components/LoginDup";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signupDup' element={<SignUpDup />} />
        <Route path='/loginDup' element={<LoginDup />} />
        <Route path='/home' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<Admin />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/Billing/:totalPrice' element={<Billing />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
