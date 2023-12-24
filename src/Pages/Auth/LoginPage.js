import React from 'react'
import LoginForm from '../../Components/Auth/LoginForm'
import { ToastContainer } from 'react-toastify'
import { Grid } from '@mui/material'
import LoginImage1 from '../../Assets/Images/LoginImage1.png'
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
      <Grid sx={{ background: '#88B0FF', height: '100vh', padding: '3em', maxWidth: '1920px' }} container spacing={0}>
        <Grid sx={{ height: '100%', width: '100%', background: 'white', borderRadius: '20px 0px 0px 20px', }} item xl={8} md={8} xs={12}>
          <img alt='LoginPage Img' src={LoginImage1} style={{ objectFit: 'cover', height: 'inherit', width: '100%', borderRadius: '20px 0px 0px 20px' }} />
        </Grid>
        <Grid item xl={4} md={4} xs={12}>
          <LoginForm />
        </Grid>

      </Grid>
    </>

  )
}

export default LoginPage