import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const ProtectedRoute = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });

      setIsRedirecting(true);
      setTimeout(() => {
        setIsRedirecting(false);
      }, 3000);
    }
  }, [token]);

  if (isRedirecting) return null;
  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
