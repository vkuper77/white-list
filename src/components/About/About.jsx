import { AppContext } from "@/src/context/app-context"
import styles from "@/styles/About.module.css"
import { useContext } from "react"

const About = () => {
    const {recordInWhiteList, getStorage} = useContext(AppContext)
    return (<div id="connect_wallet" className={styles.container}>
                <div>
                    <h1 className={styles.title}>Whitelist</h1>
                    <p className={styles.text}>Give yourself a chance to win the sacred NFT.</p>
                    <p className={styles.text}>Push the button on the right.</p>
                </div>
                <a onClick={recordInWhiteList} className={styles.button}>participate</a>
                <a onClick={getStorage} className={styles.button}>getStorage</a>
                <div className={styles.ellipse}/>
            </div>)
} 

export default About