import {memo} from 'react'
import styles from "@/styles/Safe.module.css"

const DaysExpensiveConten = ({time}) => (
    <div>
        <span className={styles.card__right__title}>{time}</span>
         <span className={styles.card__right__subtitle}>days</span>
        <span className={styles.card__right__subtitle}>to your money is unlocked</span>
    </div>
)

export default memo(DaysExpensiveConten)