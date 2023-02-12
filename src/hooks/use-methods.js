import { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setIsRecordedAccount, setIsSigned } from '@/src/store/slice/appSlice';
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
        const [isSignedAccount, isRecordedAccount] = await Promise.all([
          middlewareTry(contract.isSigned({from: account})),
          middlewareTry(contract.isRecordedWhiteList({from: account}))
        ])
        dispatch(setIsSigned(isSignedAccount))
        dispatch(setIsRecordedAccount(isRecordedAccount))
      }, [contract, account])
    
      const add = useCallback(async () => {
        if(!isSigned) {
          middlewareDapp(sign)()
          return
        }
        await middlewareTry(contract.putInSafe({from: account, value: web3.utils.toWei('1', 'ether')}))
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
        add: middlewareDapp(add), 
        getFromSafe: middlewareDapp(getFromSafe)
    }
}