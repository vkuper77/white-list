import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: null,
  balance: 0,
  isSigned: false,
  isRecordedWhiteList: false,
  addresses: [],
  timeLeft: [],
  isLockedButton: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setBalance: (state, action) => {
        state.balance = action.payload
      },
      setAccount: (state, action) => {
        state.account = action.payload
      },
      setIsRecordedAccount: (state, action) => {
        state.isRecordedWhiteList = action.payload
      },
      setIsSigned: (state, action) => {
        state.isSigned = action.payload
      },
      setAddresses: (state, action) => {
        state.addresses = action.payload
      },
      setTimeLeft: (state, action) => {
        state.timeLeft = action.payload
      },
      setLockedButton: (state, action) => {
        state.isLockedButton = action.payload
      },
    },
  })
  
export const { setBalance, setAccount, setIsRecordedAccount, setIsSigned, setAddresses, setTimeLeft, setLockedButton } = appSlice.actions
export default appSlice.reducer