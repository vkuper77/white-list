import useContractMethods from "@/src/hooks/use-contract-methods"
import CashExpensiveContent from "./CashExpensiveContent"

const CashMachine = () => {
    const {getFromSafe} = useContractMethods()
    return (<CashExpensiveContent callback={getFromSafe} />)
}

export default CashMachine