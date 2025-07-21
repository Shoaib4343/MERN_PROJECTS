import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const backend_url = import.meta.env.VITE_SERVER_URL;

  // get auth state is user is auth or not
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/auth/is-auth`,{withCredentials:true});
       if (data.success) {
      setIsLogedIn(true);
       getUserData();
    } else {
      // user not logged in
      setIsLogedIn(false);
      setUserData(false);
    }
    } catch (error) {
      setIsLogedIn(false);
      setUserData(false)
      toast.error(error?.response?.data?.message);
    }
  };

  // useeffect
  useEffect(() => {
    getAuthState();
  }, []);

  // get log user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/user/data`, {
        withCredentials: true,
      });
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      console.log(
        "error whwile getting user data api ",
        error?.response?.data?.message
      );
      toast.error(error?.response?.data?.message);
    }
  };
  const value = {
    backend_url,
    isLogedIn,
    setIsLogedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// create auth custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
