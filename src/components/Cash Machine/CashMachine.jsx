import { AppContext } from "@/src/context/app/context"
import { useContext, useCallback } from "react"
import CashExpensiveContent from "./CashExpensiveContent"

const CashMachine = () => {
    const {getFromSafe} = useContext(AppContext)
    const collback = useCallback(getFromSafe, [getFromSafe])
    return (<CashExpensiveContent collback={() => {}} />)
}

export default CashMachine