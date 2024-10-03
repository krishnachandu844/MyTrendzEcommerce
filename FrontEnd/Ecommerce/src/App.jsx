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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path='/home'
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route
            path='/admin'
            element={
              <>
                <NavBar />
                <Admin />
              </>
            }
          />
          <Route
            path='/products'
            element={
              <>
                <NavBar />
                <Products />
              </>
            }
          />
          <Route
            path='/product/:productId'
            element={
              <>
                <NavBar />
                <Product />
              </>
            }
          />
          <Route
            path='/favorite'
            element={
              <>
                <NavBar />
                <Favorite />
              </>
            }
          />
          <Route
            path='/cart'
            element={
              <>
                <NavBar />
                <CartPage />
              </>
            }
          />
          <Route
            path='/Billing/:totalPrice'
            element={
              <>
                <NavBar />
                <Billing />
              </>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
