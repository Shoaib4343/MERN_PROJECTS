import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {path: "/", element: <Home/>},
        {path: "/about", element: <About/>},
        {path: "/contact", element: <Contact/>},
        {path: "/policy", element: <Policy/>},
        {path: "/register", element: <Register/>},
        {path: "/login", element: <Login/>},
        
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App