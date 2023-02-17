import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNotificationInfo } from "@/src/store/slice/appSlice"
import { getNotificationLeft } from "@/src/store/slice/selectors"
import styles from "@/styles/Petition.module.css"


const Notification = () => {
    const tip = useSelector(getNotificationLeft)
    const dispatch = useDispatch()

    useEffect(() => {
        !!tip && setTimeout(() => {
            dispatch(deleteNotificationInfo(tip.id))
        }, 3000)
    }, [tip])

    if(!tip) {
        return null
    }
    
    let styleContainer = styles.container__notification
    let styleText = styles.text__notification

    if(!tip.success) {
        styleContainer += ` ${styles.container__notification__error}`
        styleText += ` ${styles.text__notification__error}`
    }

    return <div className={styleContainer}>
                <p className={styleText}>{tip.text[0]}</p>
                <p className={styleText}>{tip.text[1]}</p>
            </div>
}

export default Notification