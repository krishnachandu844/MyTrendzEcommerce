import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Product from "./components/Product";

import NotFoundPage from "./components/NotFoundPage";
import CartPage from "./components/CartPage";
import Billing from "./components/Billing";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorite from "./components/Favorite";
import Home from "./components/Home";

import Admin from "./components/Admin";

// function App() {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Routes>
//         <Route path='/' element={<Signup />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/res' element={<Responsive />} />

//         <Route element={<ProtectedRoute />}>
//           <Route
//             path='/home'
//             element={
//               <>
//                 <NavBar />
//                 <Home />
//               </>
//             }
//           />
//           <Route
//             path='/admin'
//             element={
//               <>
//                 <NavBar />
//                 <Admin />
//               </>
//             }
//           />
//           <Route
//             path='/products'
//             element={
//               <>
//                 <NavBar />
//                 <Products />
//               </>
//             }
//           />
//           <Route
//             path='/product/:productId'
//             element={
//               <>
//                 <NavBar />
//                 <Product />
//               </>
//             }
//           />
//           <Route
//             path='/favorite'
//             element={
//               <>
//                 <NavBar />
//                 <Favorite />
//               </>
//             }
//           />
//           <Route
//             path='/cart'
//             element={
//               <>
//                 <NavBar />
//                 <CartPage />
//               </>
//             }
//           />
//           <Route
//             path='/Billing/:totalPrice'
//             element={
//               <>
//                 <NavBar />
//                 <Billing />
//               </>
//             }
//           />
//           <Route
//             path='*'
//             element={
//               <>
//                 <NavBar />
//                 <NotFoundPage />
//               </>
//             }
//           />
//         </Route>
//       </Routes>
//       <ToastContainer />
//     </BrowserRouter>
//   );
// }
function App() {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" || location.pathname === "/login";
  console.log(hideSidebar);
  return (
    <div className='flex'>
      {!hideSidebar && <NavBar />}
      <div className='flex-1'>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

{
  /* <Route
          path='/home'
          element={
            <div className='flex'>
              <NavBar />
              <Home />
            </div>
          }
        />

        <Route
          path='*'
          element={
            <>
              <NavBar />
              <NotFoundPage />
            </>
          }
        /> */
}

export default App;
