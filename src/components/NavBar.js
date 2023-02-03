import styles from "@/styles/NavBar.module.css"
import { Quantico } from '@next/font/google'

const quantico = Quantico({subsets: ['latin'], weight: '400' })

const NavBar = () => {
    return (<div className={quantico.className}>
                <div className={styles.container}>
                    <a href="#0" className={styles.link}>petition</a>
                    <a href="#1" className={styles.link}>cash machine</a>
                    <a href="#2" className={styles.link}>connect wallet</a>
                    <a href="#3" className={styles.link}>safe</a>
                    <a href="#4" className={styles.link}>description</a>
                </div>
            </div>)
}

export default NavBar 