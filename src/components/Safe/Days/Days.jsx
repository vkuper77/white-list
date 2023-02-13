import DaysExpensiveConten from "./DaysExpensiveConten"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import moment from "moment"
import { setLockedButton } from "@/src/store/slice/appSlice"

const WEEK = 604800
const PLACEHOLDER_TIME = '00:00:00:00'
const checkTimeout = (timeStamp) => (Number(timeStamp) + WEEK) < moment().unix()

const Days = () => {
    const [time, setTime] = useState(PLACEHOLDER_TIME)
    const { timeLeft } = useSelector((state) => state)
    const timerId = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        if(checkTimeout(timeLeft['timestamp'])) {
            clearInterval(timerId.current)
            dispatch(setLockedButton(false))
        }
    }, [time])

    useEffect(() => {
        if(!timeLeft['timestamp'] || Number(timeLeft['timestamp']) === 0) {
            clearInterval(timerId.current)
            setTime(PLACEHOLDER_TIME)
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

    return <DaysExpensiveConten time={time} />
}

export default Days