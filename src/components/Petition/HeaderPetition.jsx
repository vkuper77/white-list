import { AppContext } from "@/src/context/app/context"
import { useSelector } from 'react-redux'
import { useContext, useCallback } from "react"
import ExpensiveConten from "./ExpensiveConten"

const HeaderPetition = () => {
    const { isSigned, addresses } = useSelector((state)=> state)
    const {sign} = useContext(AppContext)
    const collback = useCallback(() => {!isSigned && sign()} , [sign, isSigned])
    return <ExpensiveConten collback={collback} isSigned={isSigned} addresses={addresses}/>
}

export default HeaderPetition