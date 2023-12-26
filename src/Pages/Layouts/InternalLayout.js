import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Components/Navigations/Navbar'
import BreadCrumbs from '../../Components/Navigations/BreadCrumbs'
import { ThemeProvider } from '@emotion/react';
import { generalTheme } from '../../Theme/GeneralTheme';
import { Box } from '@mui/material';


function InternalLayout({ children }) {
  return (
    <ThemeProvider theme={generalTheme}>
      <Navbar />
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
      <ToastContainer />
      <Box sx={{ background: generalTheme.palette.backgrounds.lightGray , maxWidth:'1920px', margin:'0 auto' , p:'0 1em 0 1em' , minHeight:'100vh'}}>
      <BreadCrumbs />
        {children}
      </Box>
    </ ThemeProvider>
  )
}

export default InternalLayout