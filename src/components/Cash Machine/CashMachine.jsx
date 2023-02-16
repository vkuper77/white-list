import { useContract } from "@/src/hooks/use-contract"
import { useCallback } from "react"
import CashExpensiveContent from "./CashExpensiveContent"

const CashMachine = () => {
    const {getFromSafe} = useContract()
    const callback = useCallback(getFromSafe, [getFromSafe])
    return (<CashExpensiveContent callback={callback} />)
}

export default CashMachine