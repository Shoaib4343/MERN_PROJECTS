import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required for styles
import PrivateRoute from "./routes/PrivateRoute";
import Dashbord from "./pages/user/Dashbord";
import ResetPassword from "./pages/ResetPassword ";
import AdminProtectRoute from "./routes/AdminProtectRoute";
import AdminDashbord from "./pages/Admin/AdminDashbord";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import UserList from "./pages/Admin/UserList";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserLayout from "./pages/user/UserLayout";
import UserOrders from "./pages/user/UserOrders";
import UserProfile from "./pages/user/UserProfile";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/policy", element: <Policy /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/forgot_password", element: <ResetPassword /> },

        // user
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "/dashbord",
              element: <UserLayout />,
              children: [
                { index: true, element: <Dashbord /> },
                { path: "orders", element: <UserOrders /> },
                { path: "profile", element: <UserProfile /> },
              ],
            },
          ],
        },

        // Admin
        {
          element: <AdminProtectRoute />, // First protect it
          children: [
            {
              path: "/admin",
              element: <AdminLayout />, // Layout with sidebar
              children: [
                { index: true, element: <AdminDashbord /> }, // Loads at /admin
                { path: "create-category", element: <CreateCategory /> },
                { path: "create-product", element: <CreateProduct /> },
                { path: "users", element: <UserList /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
