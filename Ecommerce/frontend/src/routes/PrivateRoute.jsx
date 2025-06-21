import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { userDashbordApi } from "../apis/Auth.api";

const PrivateRoute = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation()

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await userDashbordApi();
        console.log("Dashbord Access ..", res.data);
        setLoading(false);
      } catch (error) {
        console.log("error : ", error.message);
        navigate("/login",{state:{from:location.pathname}});
      }
    };

    auth?.token ? verifyUser() : navigate("/login",{state:{from:location.pathname}});
    
  }, [auth, navigate,location]);

  if (loading) {
    return (
      <div className="text-center text-white mt-10">Checking Access...</div>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
