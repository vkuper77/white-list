import { AppContext } from "@/src/context/app/context"
import { useContext, useCallback } from "react"
import { useSelector } from 'react-redux'
import WalletExpensiveConten from "./WalletExpensiveConten"

const Wallet = () => {
    const { balance } = useSelector((state) => state)
    const { add } = useContext(AppContext)
    const collback = useCallback(add, [add])
    return <WalletExpensiveConten collback={collback} balance={balance}/>
}

export default Wallet