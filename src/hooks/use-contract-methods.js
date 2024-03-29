import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useContract } from "./use-contract";
import { middlewareTry } from "../middleware/middleware-try";
import { middlewareContract } from "../middleware/middleware-contract";
import { middlewareProvider } from "../middleware/middleware-provider";
import { setBalance, setIsRecordedAccount, setIsSigned, setAddresses, setTimeLeft, setNotificationInfo } from '@/src/store/slice/appSlice';

export default function useContractMethods() {
    const [shouldReload, reload] = useState(false)
    const { contract, web3, provider } = useContract()
    const { account, isSigned } = useSelector((state)=> state)
    const dispatch = useDispatch()

    const [pending, setPending] = useState(false)

    function reloadEffect () {
      reload(p => !p)
      setPending(false)
    }

    useEffect(() => {
      !!web3 && middlewareContract(!!contract &&(async () => {
        const [addresses, time] = await Promise.all([
          // middlewareTry(web3.eth.getBalance(contract.address)),
          middlewareTry(contract.getSigns(), () => []),
          middlewareTry(contract.checkSafe({from: account}), () => []),
        ])
        dispatch(setBalance(web3.utils.fromWei(time['amount'], 'ether')))
        dispatch(setAddresses(addresses))
        dispatch(setTimeLeft(time)) 
        // !!contractBalance && dispatch(setBalance(web3.utils.fromWei(contractBalance, 'ether')))
      }))()
    }, [shouldReload]) 

    const recordInWhiteList = useCallback(async () => {
        if(pending) {
          return
        }

        if(!account) {
          try {
            await provider.request({method: 'eth_requestAccounts'})
          } catch {
            setPending(false)
            dispatch(setNotificationInfo({id: Date.now(), autoHide: true, position: 'top', text: 'Wallet is not detected! LogIn please.', url: null})) 
            return
          }
        }

        setPending(true)
        
        await middlewareTry(contract.recordInWhiteList({from: account}), null, 'signed the petition')
        const isRecordedAccount = await middlewareTry(contract.isRecordedWhiteList({from: account}))
        dispatch(setIsRecordedAccount(isRecordedAccount))

        setPending(false)
      }, [contract, account, provider])
    
      const sign = useCallback(async () => {
        if(pending){
          return
        }

        if(!account) {
          try {
            await provider.request({method: 'eth_requestAccounts'})
          } catch {
            setPending(false)
            dispatch(setNotificationInfo({id: Date.now(), autoHide: true, position: 'top', text: 'Wallet is not detected! LogIn please in Metamask', url: null})) 
            return
          }
        }

        setPending(true)

        await middlewareTry(contract.doSign({from: account}), null, 'added an address')
        const [isSignedAccount, isRecordedAccount, addresses] = await Promise.all([
          middlewareTry(contract.isSigned({from: account})),
          middlewareTry(contract.isRecordedWhiteList({from: account})),
          middlewareTry(contract.getSigns())
        ]).finally(() => {
          setPending(false)
        })
        
        dispatch(setIsSigned(isSignedAccount))
        dispatch(setIsRecordedAccount(isRecordedAccount))
        dispatch(setAddresses(addresses))

      }, [contract, account])
    
      const add = useCallback(async (quantity) => {
        if(pending){
          return
        }

        if(!isSigned) {
          dispatch(setNotificationInfo({id: Date.now(), autoHide: true, position: 'top', text: 'Wallet is not detected! LogIn please in Metamask', url: null}))
          middlewareDapp(sign)()
          setPending(false)
          return 
        }

        setPending(true)

        await middlewareTry(contract.putInSafe({from: account, value: web3.utils.toWei(`${quantity}`, 'ether')}), null, 'made a deposit')
        reloadEffect()
      }, [contract, account, web3, isSigned])
    
      const getFromSafe = useCallback(async () => {
        if(pending){
          return
        }

        if(!isSigned) {
          dispatch(setNotificationInfo({id: Date.now(), autoHide: true, position: 'top', text: 'Wallet is not detected! LogIn please in Metamask', url: null}))
          middlewareDapp(sign)()
          setPending(false)
          return 
        }

        setPending(true)

        await middlewareTry(contract.getFromSafe({from: account}), null, 'received a deposit')
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
        pending
    }
}