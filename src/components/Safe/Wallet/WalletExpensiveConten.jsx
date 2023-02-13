import {memo} from 'react'
import styles from "@/styles/Safe.module.css"

const WalletExpensiveConten = ({callback, balance}) => (
    <div className={styles.card__left}>
        <p className={styles.card__subtitle}>wallet balance:</p>
        <p className={`${styles.card__subtitle} ${styles.text__balance}`}>{balance} ETH</p>
        <a onClick={callback} className={styles.button}>add</a>
    </div>
)

export default memo(WalletExpensiveConten)