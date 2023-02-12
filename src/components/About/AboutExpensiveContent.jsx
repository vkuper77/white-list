import {memo} from 'react'
import styles from "@/styles/About.module.css"

const AboutExpensiveConten = ({collback, isRecordedWhiteList}) => (
    <div id="connect_wallet" className={styles.container}>
        <div>
            <h1 className={styles.title}>Whitelist</h1>
            <p className={styles.text}>Give yourself a chance to win the sacred NFT.</p>
            <p className={styles.text}>Push the button on the right.</p>
        </div>
        <a onClick={collback} className={styles.button}>{isRecordedWhiteList ? 'you are added to WL' : 'participate'}</a>
        <div className={styles.ellipse}/>
    </div>
    )

export default memo(AboutExpensiveConten)