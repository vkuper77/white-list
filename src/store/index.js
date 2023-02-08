import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slice/appSlice'

export const store = configureStore({reducer: appReducer})