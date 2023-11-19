import React from 'react'
import LoginForm from '../../Components/Auth/LoginForm'
import { ToastContainer } from 'react-toastify'
import { Box } from '@mui/material'
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
      <Box>
        <LoginForm />
      </Box>
    </>

  )
}

export default LoginPage