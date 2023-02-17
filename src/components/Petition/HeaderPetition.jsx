import { useSelector } from 'react-redux'
import { useCallback } from "react"
import ExpensiveConten from "./ExpensiveConten"
import useContractMethods from '@/src/hooks/use-contract-methods'

const HeaderPetition = () => {
    const { isSigned, addresses } = useSelector((state)=> state)
    const {sign, pending} = useContractMethods()
    const collback = useCallback(() => {!isSigned && sign()} , [sign, isSigned])
    return <ExpensiveConten pending={pending} collback={collback} isSigned={isSigned} addresses={addresses}/>
}

export default HeaderPetition