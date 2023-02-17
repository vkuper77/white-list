import useContractMethods from "@/src/hooks/use-contract-methods"
import CashExpensiveContent from "./CashExpensiveContent"

const CashMachine = () => {
    const {getFromSafe, pending} = useContractMethods()
    return (<CashExpensiveContent pending={pending} callback={getFromSafe} />)
}

export default CashMachine