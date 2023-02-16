import { AppContext } from "@/src/context/app/context"
import { useContext, useCallback } from "react"
import CashExpensiveContent from "./CashExpensiveContent"

const CashMachine = () => {
    const {getFromSafe} = useContext(AppContext)
    const callback = useCallback(getFromSafe, [getFromSafe])
    return (<CashExpensiveContent callback={callback} />)
}

export default CashMachine