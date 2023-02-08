import { AppContext } from './context'
import useLoadProvider from "@/src/hooks/use-load-provider";
import { useCallback, useEffect, useState } from "react";
import { accountListener } from '@/src/utils/account-listener';
import { middlewareTry } from "@/src/middleware/middleware-try";
import { middlewareProvider } from "@/src/middleware/middleware-provider";
import { middlewareContract } from "@/src/middleware/middleware-contract";

export default function AppProvider({children}) {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [shouldReload, reload] = useState(false)

  const {web3, provider, contract, coldBoot} = useLoadProvider()

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
        setAccount(acc)
        setBalance(web3.utils.fromWei(contractBalance, 'ether'))
    }))()
  }, [web3])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract &&(async () => {
      const value = await middlewareTry(web3.eth.getBalance(contract.address))
      !!value && setBalance(web3.utils.fromWei(value, 'ether'))
    }))()
  }, [shouldReload])

  const recordInWhiteList = useCallback(async () => {
     await middlewareTry(contract.recordInWhiteList({from: account}))
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
            getFromSafe: middlewareDapp(getFromSafe), 
            balance 
          }}>
            {children}
        </AppContext.Provider>
}