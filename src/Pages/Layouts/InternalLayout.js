import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Components/Navigations/Navbar'
import BreadCrumbs from '../../Components/Navigations/BreadCrumbs'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Ana renk
    },
    secondary: {
      main: '#f50057', // İkincil renk
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
      textTransform: "none",
    },
    button: {
      textTransform: "none",
    }
  },
});


function InternalLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
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
      <BreadCrumbs />
      {children}
    </ ThemeProvider>
  )
}

export default InternalLayout