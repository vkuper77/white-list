import { AppContext } from "@/src/context/app/context"
import { useContext, useCallback } from "react"
import ExpensiveConten from "./ExpensiveConten"

const HeaderPetition = () => {
    const {sign} = useContext(AppContext)
    const collback = useCallback(sign, [sign])
    return <ExpensiveConten collback={collback}/>
}

export default HeaderPetition