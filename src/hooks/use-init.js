import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { accountListener } from '@/src/utils/account-listener';
import { middlewareTry } from "@/src/middleware/middleware-try";
import { middlewareContract } from "@/src/middleware/middleware-contract";
import { setBalance, setAccount, setIsRecordedAccount, setIsSigned, setAddresses, setTimeLeft } from '@/src/store/slice/appSlice';

export default function useInit(web3, provider, contract, coldBoot) {
    const { account } = useSelector((state)=> state)
    const dispatch = useDispatch()
  
    useEffect(() => {
        !!provider && accountListener(provider, coldBoot)
    }, [provider])

    useEffect(() => {
        !!contract && (async () => {
        const [isRecordedAccount, isSignedAccount, addresses, time] = await Promise.all([
            account && middlewareTry(contract.isRecordedWhiteList({from: account})), 
            account && middlewareTry(contract.isSigned({from: account})),
            middlewareTry(contract.getSigns(), () => []),
            middlewareTry(contract.checkSafe({from: account}), () => []),
        ])
            dispatch(setBalance(web3.utils.fromWei(time['amount'], 'ether')))
            dispatch(setIsRecordedAccount(isRecordedAccount))
            dispatch(setIsSigned(isSignedAccount))
            dispatch(setAddresses(addresses))
            dispatch(setTimeLeft(time))
        })() 
    }, [account, web3])

    useEffect(() => {
        !!web3 && middlewareContract(!!contract && (async () => {
            const [[ acc ]] = await Promise.all([
            middlewareTry(web3.eth.getAccounts()),
            // middlewareTry(web3.eth.getBalance(contract.address))
            ])
            dispatch(setAccount(acc))
            // dispatch(setBalance(web3.utils.fromWei(contractBalance, 'ether')))
        }))()
    }, [web3])
}