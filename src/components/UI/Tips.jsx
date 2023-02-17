import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNotificationInfo } from "@/src/store/slice/appSlice"
import { getNotificationTop } from "@/src/store/slice/selectors"
import styles from "@/styles/Tips.module.css"

const Tips = () => {
    const tip = useSelector(getNotificationTop)
    const dispatch = useDispatch()
    
    useEffect(() => {
        !!tip && tip.autoHide && setTimeout(() => {
            dispatch(deleteNotificationInfo(tip.id))
        }, 3000)
    }, [tip])

    if(!tip){
        return null
    }

    return <div className={styles.cantainer}>
                    <span className={styles.text_tips}>{tip.text}</span>
                    {tip?.url && <a href={tip.url} target="_blank" className={`${styles.text_tips} ${styles.text_url}`}>{tip.urlName}</a>}
            </div>
}

export default Tips