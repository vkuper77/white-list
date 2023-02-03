import styles from "@/styles/About.module.css"
import { Quantico } from '@next/font/google'

const quantico = Quantico({subsets: ['latin'], weight: '400' })

const About = () => {
    return (<div className={quantico.className}>
                <div className={styles.container}>
                    <div>
                        <p className={styles.title}>Whitelist</p>
                        <p className={styles.text}>Give yourself a chance to win the sacred NFT.</p>
                        <p className={styles.text}>Push the button on the right.</p>
                    </div>
                    <a className={styles.button}>participate</a>
                    <div className={styles.ellipse}/>
                </div>
            </div> )
} 

export default About