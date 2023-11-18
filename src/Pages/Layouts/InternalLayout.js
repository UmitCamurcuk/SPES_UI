import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Components/Navigations/Navbar'
import BreadCrumbs from '../../Components/Navigations/BreadCrumbs'
function InternalLayout({ children }) {
  return (
    <>
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
    </>
  )
}

export default InternalLayout