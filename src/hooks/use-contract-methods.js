import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useContract } from "./use-contract";
import { middlewareTry } from "../middleware/middleware-try";
import { middlewareContract } from "../middleware/middleware-contract";
import { middlewareProvider } from "../middleware/middleware-provider";
import { setBalance, setIsRecordedAccount, setIsSigned, setAddresses, setTimeLeft } from '@/src/store/slice/appSlice';

export default function useContractMethods() {
    const [shouldReload, reload] = useState(false)
    const { contract, web3, provider } = useContract()
    const { account, isSigned } = useSelector((state)=> state)
    const dispatch = useDispatch()

    function reloadEffect () {
      reload(p => !p)
    }

    useEffect(() => {
      !!web3 && middlewareContract(!!contract &&(async () => {
        const [contractBalance, addresses, time] = await Promise.all([
          middlewareTry(web3.eth.getBalance(contract.address)),
          middlewareTry(contract.getSigns(), () => []),
          middlewareTry(contract.checkSafe({from: account}), () => []),
        ])
        dispatch(setAddresses(addresses))
        dispatch(setTimeLeft(time)) 
        !!contractBalance && dispatch(setBalance(web3.utils.fromWei(contractBalance, 'ether')))
      }))()
    }, [shouldReload]) 

    const recordInWhiteList = useCallback(async () => {
        if(!account) {
          try {
            await provider.request({method: 'eth_requestAccounts'})
          } catch {
            return alert('Wallet is not detected!')
          }
        }
        await middlewareTry(contract.recordInWhiteList({from: account}))
        const isRecordedAccount = await middlewareTry(contract.isRecordedWhiteList({from: account}))
        dispatch(setIsRecordedAccount(isRecordedAccount))
      }, [contract, account, provider])
    
      const sign = useCallback(async () => {
        await middlewareTry(contract.doSign({from: account}))
        const [isSignedAccount, isRecordedAccount, addresses] = await Promise.all([
          middlewareTry(contract.isSigned({from: account})),
          middlewareTry(contract.isRecordedWhiteList({from: account})),
          middlewareTry(contract.getSigns())
        ])
        dispatch(setIsSigned(isSignedAccount))
        dispatch(setIsRecordedAccount(isRecordedAccount))
        dispatch(setAddresses(addresses))
      }, [contract, account])
    
      const add = useCallback(async (quantity) => {
        if(!isSigned) {
          middlewareDapp(sign)()
          return alert('Wallet is not detected!')
        }
        await middlewareTry(contract.putInSafe({from: account, value: web3.utils.toWei(`${quantity}`, 'ether')}))
        reloadEffect()
      }, [contract, account, web3, isSigned])
    
      const getFromSafe = useCallback(async () => {
        if(!isSigned) {
          middlewareDapp(sign)()
          return alert('Wallet is not detected!')
        }
        await middlewareTry(contract.getFromSafe({from: account}), () => {
          alert('Wallet is not detected!')
        })
        reloadEffect()
      }, [contract, account, isSigned])
    
      const middlewareDapp = useCallback((callback) => {
        return middlewareContract(!!contract && middlewareProvider(!!provider && callback))
      }, [contract, provider])

      return {
        recordInWhiteList: middlewareDapp(recordInWhiteList), 
        sign: middlewareDapp(sign), 
        getFromSafe: middlewareDapp(getFromSafe),
        addEth: (v)=> middlewareDapp(add(v)),
    }
}