import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Auth/AuthSlice'

export default configureStore({
  reducer: {
    'Auth': AuthSlice
  },
})