import { useEffect, useState } from "react";
import { AppContext } from './context'
import { useSelector, useDispatch } from 'react-redux'
import useLoadProvider from "@/src/hooks/use-load-provider";
import useMethods from '@/src/hooks/use-methods';
import { accountListener } from '@/src/utils/account-listener';
import { middlewareTry } from "@/src/middleware/middleware-try";
import { middlewareContract } from "@/src/middleware/middleware-contract";
import { setBalance, setAccount, setIsRecordedAccount, setIsSigned, setAddresses } from '@/src/store/slice/appSlice';

export default function AppProvider({children}) {
  const [shouldReload, reload] = useState(false)
  const { account } = useSelector((state)=> state)
  
  const {web3, provider, contract, coldBoot} = useLoadProvider()
  const mehods = useMethods(contract, web3, provider, reloadEffect)
  const dispatch = useDispatch()

  function reloadEffect () {
    reload(p => !p)
  }
  
  useEffect(() => {
    !!provider && accountListener(provider, coldBoot)
  }, [provider])

  useEffect(() => {
    !!contract && (async () => {
      const [isRecordedAccount, isSignedAccount, addresses] = await Promise.all([
        account && middlewareTry(contract.isRecordedWhiteList({from: account})), 
        account && middlewareTry(contract.isSigned({from: account})),
        middlewareTry(contract.getSigns(), () => [])
      ])
        dispatch(setIsRecordedAccount(isRecordedAccount))
        dispatch(setIsSigned(isSignedAccount))
        dispatch(setAddresses(addresses))
    })() 
}, [account, web3])

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
      const [contractBalance, addresses] = await Promise.all([
        middlewareTry(web3.eth.getBalance(contract.address)),
        middlewareTry(contract.getSigns())
      ])
      dispatch(setAddresses(addresses)) 
      !!contractBalance && dispatch(setBalance(web3.utils.fromWei(contractBalance, 'ether')))
    }))()
  }, [shouldReload]) 

  return <AppContext.Provider value={mehods}>
            {children}
        </AppContext.Provider>
}