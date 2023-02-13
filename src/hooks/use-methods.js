import { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setIsRecordedAccount, setIsSigned, setAddresses } from '@/src/store/slice/appSlice';
import { middlewareTry } from "../middleware/middleware-try";
import { middlewareContract } from "../middleware/middleware-contract";
import { middlewareProvider } from "../middleware/middleware-provider";

export default function useMethods(contract, web3, provider, callback) {
    const { account, isSigned } = useSelector((state)=> state)
    const dispatch = useDispatch()

    const recordInWhiteList = useCallback(async () => {
        await middlewareTry(contract.recordInWhiteList({from: account}))
        const isRecordedAccount = await middlewareTry(contract.isRecordedWhiteList({from: account}))
        dispatch(setIsRecordedAccount(isRecordedAccount))
      }, [contract, account])
    
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
          return
        }
        await middlewareTry(contract.putInSafe({from: account, value: web3.utils.toWei(`${quantity}`, 'ether')}))
        callback()
      }, [contract, account, web3, isSigned])
    
      const getFromSafe = useCallback(async () => {
        if(!isSigned) {
          middlewareDapp(sign)()
          return
        }
        await middlewareTry(contract.getFromSafe({from: account}))
        callback()
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