import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';


import AppLayout from './layout/AppLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'

const App = () => {
  return (
   <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />}  />
          <Route path='login' element={<Login />}  />
          <Route path='register' element={<Register />}  />
          <Route path='reset-password' element={<ResetPassword />}  />
          <Route path='email-verify' element={<EmailVerify />}  />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App