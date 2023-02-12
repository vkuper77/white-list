import { AppContext } from './context'
import { useSelector, useDispatch } from 'react-redux'
import useLoadProvider from "@/src/hooks/use-load-provider";
import { useCallback, useEffect, useState } from "react";
import { accountListener } from '@/src/utils/account-listener';
import { middlewareTry } from "@/src/middleware/middleware-try";
import { middlewareProvider } from "@/src/middleware/middleware-provider";
import { middlewareContract } from "@/src/middleware/middleware-contract";
import { setBalance, setAccount, setIsRecordedAccount } from '@/src/store/slice/appSlice';

export default function AppProvider({children}) {
  const [shouldReload, reload] = useState(false)
  const { account } = useSelector((state)=> state)
  
  const {web3, provider, contract, coldBoot} = useLoadProvider()
  const dispatch = useDispatch()

  function reloadEffect () {
    reload(p => !p)
  }
  
  useEffect(() => {
    !!provider && accountListener(provider, coldBoot)
  }, [provider])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract && (async () => {
        const [ acc ] = await middlewareTry(web3.eth.getAccounts())
        const contractBalance = await middlewareTry(web3.eth.getBalance(contract.address))
        const isRecordedAccount = await middlewareTry(contract.isRecordedWhiteList({from: account}))
        
        dispatch(setAccount(acc))
        dispatch(setBalance(web3.utils.fromWei(contractBalance, 'ether')))
        dispatch(setIsRecordedAccount(isRecordedAccount))
    }))()
  }, [web3])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract &&(async () => {

      const [value, isRecordedAccount] = await Promise.all([
        middlewareTry(web3.eth.getBalance(contract.address)),
        middlewareTry(contract.isRecordedWhiteList({from: account}))
      ])

      dispatch(setIsRecordedAccount(isRecordedAccount))
      !!value && dispatch(setBalance(web3.utils.fromWei(value, 'ether')))
      
    }))()
  }, [shouldReload])

  const recordInWhiteList = useCallback(async () => {
    await middlewareTry(contract.recordInWhiteList({from: account}))
    const isRecordedAccount = await middlewareTry(contract.isRecordedWhiteList({from: account}))
    dispatch(setIsRecordedAccount(isRecordedAccount))
  }, [contract, account])

  const sign = useCallback(async () => {
    await middlewareTry(contract.doSign({from: account}))
  }, [contract, account])

  const add = useCallback(async () => {
    await middlewareTry(contract.putInSafe({from: account, value: web3.utils.toWei('1', 'ether')}))
    reloadEffect()
  }, [contract, account, web3])

  const getFromSafe = useCallback(async () => {
    await middlewareTry(contract.getFromSafe({from: account}))
    reloadEffect()
  }, [contract, account])

  const middlewareDapp = useCallback((callback) => {
    return middlewareContract(!!contract && middlewareProvider(!!provider && callback))
  }, [contract, provider])

  return <AppContext.Provider value={{
            recordInWhiteList: middlewareDapp(recordInWhiteList), 
            sign: middlewareDapp(sign), 
            add: middlewareDapp(add), 
            getFromSafe: middlewareDapp(getFromSafe)
          }}>
            {children}
        </AppContext.Provider>
}