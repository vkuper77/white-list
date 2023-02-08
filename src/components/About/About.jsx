import { AppContext } from "@/src/context/app/context"
import { useCallback, useContext } from "react"
import AboutExpensiveConten from "./AboutExpensiveContent"

const About = () => {
    const { recordInWhiteList } = useContext(AppContext)
    const collback = useCallback(recordInWhiteList, [recordInWhiteList])
    return <AboutExpensiveConten collback={collback}/>
} 

export default About