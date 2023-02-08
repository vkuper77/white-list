import {memo} from 'react'
import styles from "@/styles/Safe.module.css"

const DaysExpensiveConten = () => (
    <div>
        {/*example format 9:22:26:8 */}
        <p className={styles.card__right__title}>0</p>
         <p className={styles.card__subtitle}>days</p>
        <p className={styles.card__subtitle}>to your money is unlocked</p>
    </div>
)

export default memo(DaysExpensiveConten)