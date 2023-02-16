import { useSelector } from 'react-redux'
import { useCallback } from "react"
import ExpensiveConten from "./ExpensiveConten"
import { useContract } from '@/src/hooks/use-contract'

const HeaderPetition = () => {
    const { isSigned, addresses } = useSelector((state)=> state)
    const {sign} = useContract()
    const collback = useCallback(() => {!isSigned && sign()} , [sign, isSigned])
    return <ExpensiveConten collback={collback} isSigned={isSigned} addresses={addresses}/>
}

export default HeaderPetition