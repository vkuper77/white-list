import DaysExpensiveConten from "./DaysExpensiveConten"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import moment from "moment"
import { setLockedButton } from "@/src/store/slice/appSlice"

const WEEK = 60*60 //7*24*60*60
const PLACEHOLDER_TIME = '00:00:00:00'
const checkTimeout = (timeStamp) => (Number(timeStamp) + WEEK) <= moment().unix()

const Days = () => {
    const [time, setTime] = useState(null)
    const { timeLeft } = useSelector((state) => state)
    const timerId = useRef()

    const dispatch = useDispatch()

    function clearTime() {
        clearInterval(timerId.current)
        dispatch(setLockedButton(false))
        setTime(PLACEHOLDER_TIME)
    }
 
    useEffect(() => {
        if(checkTimeout(timeLeft['timestamp']) || time === PLACEHOLDER_TIME) { 
            clearTime()
        }
    }, [time])

    useEffect(() => {
        if(checkTimeout(timeLeft['timestamp'])) {
            clearTime()
            return
        }
        dispatch(setLockedButton(true))
        timerId.current = setInterval(() => {
            const timee = moment.unix(Number(timeLeft['timestamp']) + WEEK);
            const nowTime = moment();
            const duration = moment.duration(timee.diff(nowTime));
            setTime(() => checkTimeout(timeLeft['timestamp']) ? 
                PLACEHOLDER_TIME :
                `${duration.days() < 10 ?'0' + duration.days(): duration.days()}:${duration.hours() < 10 ?'0' + duration.hours(): duration.hours()}:${duration.minutes() < 10 ?'0' + duration.minutes(): duration.minutes()}:${duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds()}`
            )
          }, 1000)
          return () => clearInterval(timerId.current)
    }, [timeLeft])

    return <DaysExpensiveConten time={time || PLACEHOLDER_TIME} />
}

export default Days