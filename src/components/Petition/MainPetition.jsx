import styles from "@/styles/Petition.module.css"
import Notification from "./Notification"

const MainPetition = () => {
    return <>
            <div className={styles.main}>
                <div className={styles.main___container__transaction}>
                    <p className={styles.main___container__transaction__title}>address</p>
                    <div>
                        <p className={styles.main___container__transaction__text}>0x6aEEb47CC03681c46e6A497187B86D846751dc77</p>
                    </div>
                </div>
                <div className={styles.main___container__date}>
                    <p className={styles.main___container__date__title}>data</p>
                    <div>
                        <p className={styles.main___container__date__text}>15.12.22</p>
                    </div>
                </div>
                <div>
                {/* <Notification /> */}
            </div>
            </div>
    </>
}
export default MainPetition