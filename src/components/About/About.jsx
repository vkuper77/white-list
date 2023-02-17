import { useCallback } from "react"
import { useSelector } from 'react-redux'
import useContractMethods from "@/src/hooks/use-contract-methods"
import AboutExpensiveConten from "./AboutExpensiveContent"

const About = () => {
    const { isRecordedWhiteList } = useSelector((state)=> state)
    const { recordInWhiteList } = useContractMethods()
    const collback = useCallback(() => { !isRecordedWhiteList && recordInWhiteList() }, [recordInWhiteList, isRecordedWhiteList])
    return <AboutExpensiveConten collback={collback} isRecordedWhiteList={isRecordedWhiteList}/>
} 

export default About