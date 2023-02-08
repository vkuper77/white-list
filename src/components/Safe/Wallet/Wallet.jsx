
import { AppContext } from "@/src/context/app/context"
import { useContext, useCallback } from "react"
import WalletExpensiveConten from "./WalletExpensiveConten"

const Wallet = () => {
    const {balance, add} = useContext(AppContext)
    const collback = useCallback(add, [add])
    return <WalletExpensiveConten collback={collback} balance={balance}/>
}

export default Wallet