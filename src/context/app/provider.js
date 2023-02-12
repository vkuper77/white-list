import { AppContext } from './context'
import { useSelector, useDispatch } from 'react-redux'
import useLoadProvider from "@/src/hooks/use-load-provider";
import { useCallback, useEffect, useState } from "react";
import { accountListener } from '@/src/utils/account-listener';
import { middlewareTry } from "@/src/middleware/middleware-try";
import { middlewareProvider } from "@/src/middleware/middleware-provider";
import { middlewareContract } from "@/src/middleware/middleware-contract";
import { setBalance, setAccount, setIsRecordedAccount, setIsSigned } from '@/src/store/slice/appSlice';

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
    !!contract && !!account && (async () => {
      const [isRecordedAccount, isSignedAccount] = await Promise.all([
        middlewareTry(contract.isRecordedWhiteList({from: account})), 
        middlewareTry(contract.isSigned({from: account}))
      ])
        dispatch(setIsRecordedAccount(isRecordedAccount))
        dispatch(setIsSigned(isSignedAccount))
    })() 
}, [account])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract && (async () => {
        const [[ acc ], contractBalance] = await Promise.all([
          middlewareTry(web3.eth.getAccounts()),
          middlewareTry(web3.eth.getBalance(contract.address))
        ])
        dispatch(setAccount(acc))
        dispatch(setBalance(web3.utils.fromWei(contractBalance, 'ether')))
    }))()
  }, [web3])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract &&(async () => {
      const value = await middlewareTry(web3.eth.getBalance(contract.address))
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
    const [isSignedAccount, isRecordedAccount] = await Promise.all([
      middlewareTry(contract.isSigned({from: account})),
      middlewareTry(contract.isRecordedWhiteList({from: account}))
    ])
    dispatch(setIsSigned(isSignedAccount))
    dispatch(setIsRecordedAccount(isRecordedAccount))
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