import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { adminDashbordApi } from "../apis/Auth.api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Error403 from "../pages/Error403";

const AdminProtectRoute = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await adminDashbordApi();
        console.log("Admin access granted:", res.data);
        setIsAllowed(true);
      } catch (error) {
        console.log("Admin access denied:", error.message);
        setIsAllowed(false); // user is logged in but not admin
      }
    };

    auth?.token
      ? verifyAdmin()
      : navigate("/login", { state: { from: location.pathname } });
  }, [auth, navigate, location]);

  if (isAllowed == null) {
    return (
      <div className="text-center text-white mt-10">
        Checking Admin Access...
      </div>
    );
  }

  if (isAllowed == false) {
    return <Error403 />;
  }

  return <Outlet />;
};

export default AdminProtectRoute;
