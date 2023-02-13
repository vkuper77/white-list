import {memo} from 'react'
import styles from "@/styles/Petition.module.css"

const ExpensiveConten = ({collback, isSigned, addresses}) => (
    <div className={styles.header_container}>
        <p className={styles.small_title}>public</p>
        <h1 className={styles.title}>petition</h1>
        <a onClick={collback} className={styles.button}>{isSigned ? 'you are logged in' : 'sign'}</a>
        <p className={styles.text}>signs quantity: {addresses.length}</p>
    </div>
)
export default memo(ExpensiveConten)