import styles from "@/styles/Petition.module.css"
import { useSelector } from 'react-redux'
import moment from "moment/moment"
import Notification from "../UI/Notification"

const MainPetition = () => {
    const { addresses } = useSelector((state)=> state)
    return <>
            <div className={styles.main}>
                <div className={styles.main___container__transaction}>
                    <p className={styles.main___container__transaction__title}>address</p>
                    <ul>
                        {addresses.map((addr) => {
                            return <li key={addr['from']} className={styles.main___container__transaction__text}>{addr['from']}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.main___container__date}>
                    <p className={styles.main___container__date__title}>data</p>
                    <ul>
                    {addresses.map((addr) => {
                            return  <li key={addr['timestamp']} className={styles.main___container__date__text}>{moment.unix(addresses[0]['timestamp']).format("DD.MM.YY")}</li>
                        })}
                    </ul>
                </div>
                <div>
                {/* <Notification /> */}
            </div>
            </div>
    </>
}

export default MainPetition