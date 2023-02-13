import {memo} from 'react'
import styles from "@/styles/Safe.module.css"
import { useSelector } from 'react-redux'

const WalletExpensiveConten = ({callback}) => {
    const { balance, timeLeft, isLockedButton } = useSelector((state) => state)
    return (
        <div className={styles.card__left}>
            <p className={styles.card__subtitle}>wallet balance:</p>
            <p className={`${styles.card__subtitle} ${styles.text__balance}`}>{balance} ETH</p>
            <a 
                onClick={callback} 
                className={`${styles.button} ${isLockedButton ? styles.button__disabled : ''}`}
            >
                {Boolean(timeLeft['amount']) ? 'take' : 'add'}
            </a>
        </div>
    )
}

export default memo(WalletExpensiveConten)