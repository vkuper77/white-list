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
      },
      setIsSigned: (state, action) => {
        state.isSigned = action.payload
      },
    },
  })
  
export const { setBalance, setAccount, setIsRecordedAccount, setIsSigned } = appSlice.actions
export default appSlice.reducer