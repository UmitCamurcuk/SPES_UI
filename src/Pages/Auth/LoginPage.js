import React from 'react'
import LoginForm from '../../Components/Auth/LoginForm'
import { ToastContainer } from 'react-toastify'
function LoginPage() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LoginForm />
      <ToastContainer />
    </>

  )
}

export default LoginPage