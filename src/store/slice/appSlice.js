import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: null,
  balance: 0,
  isSigned: false,
  isRecordedWhiteList: false,
  addresses: [],
  timeLeft: [],
  isLockedButton: false,
  notifications: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setBalance: (state, {payload}) => {
        state.balance = payload
      },
      setAccount: (state, {payload}) => {
        state.account = payload
      },
      setIsRecordedAccount: (state, {payload}) => {
        state.isRecordedWhiteList = payload
      },
      setIsSigned: (state, {payload}) => {
        state.isSigned = payload
      },
      setAddresses: (state, action) => {
        state.addresses = action.payload
      },
      setTimeLeft: (state, {payload}) => {
        state.timeLeft = payload
      },
      setLockedButton: (state, {payload}) => {
        state.isLockedButton = payload
      },
      setNotificationInfo:(state, {payload}) => {
        state.notifications.push(payload) 
      },
      deleteNotificationInfo:(state, {payload}) => {
        state.notifications = state.notifications.filter(n => n.id !== payload) 
      },
    },
  })
  
export const { 
  setBalance, 
  setAccount, 
  setIsRecordedAccount, 
  setIsSigned, 
  setAddresses, 
  setTimeLeft, 
  setLockedButton,
  setNotificationInfo, 
  deleteNotificationInfo 
  } = appSlice.actions
export default appSlice.reducer