import {memo} from 'react'
import styles from "@/styles/Safe.module.css"

const DaysExpensiveConten = ({time}) => (
    <div>
        <p className={styles.card__right__title}>{time}</p>
         <p className={styles.card__subtitle}>days</p>
        <p className={styles.card__subtitle}>to your money is unlocked</p>
    </div>
)

export default memo(DaysExpensiveConten)