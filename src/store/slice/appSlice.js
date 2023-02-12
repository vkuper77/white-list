import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: null,
  balance: 0,
  isSigned: false,
  isRecordedWhiteList: false,
  addresses: []
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
      }
    },
  })
  
export const { setBalance, setAccount, setIsRecordedAccount } = appSlice.actions
export default appSlice.reducer