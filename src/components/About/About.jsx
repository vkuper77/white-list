import { AppContext } from "@/src/context/app/context"
import { useCallback, useContext } from "react"
import { useSelector } from 'react-redux'
import AboutExpensiveConten from "./AboutExpensiveContent"

const About = () => {
    const { isRecordedWhiteList } = useSelector((state)=> state)
    const { recordInWhiteList } = useContext(AppContext)
    const collback = useCallback(() => { !isRecordedWhiteList && recordInWhiteList() }, [recordInWhiteList])
    return <AboutExpensiveConten collback={collback} isRecordedWhiteList={isRecordedWhiteList}/>
} 

export default About