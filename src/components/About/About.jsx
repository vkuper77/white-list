import { useContract } from "@/src/hooks/use-contract"
import { useCallback } from "react"
import { useSelector } from 'react-redux'
import AboutExpensiveConten from "./AboutExpensiveContent"

const About = () => {
    const { isRecordedWhiteList } = useSelector((state)=> state)
    const { recordInWhiteList } = useContract()
    const collback = useCallback(() => { !isRecordedWhiteList && recordInWhiteList() }, [recordInWhiteList, isRecordedWhiteList])
    return <AboutExpensiveConten collback={collback} isRecordedWhiteList={isRecordedWhiteList}/>
} 

export default About