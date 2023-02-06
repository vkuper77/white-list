import styles from "@/styles/About.module.css"

const About = () => {
    return (
            <div className={styles.container}>
                <div>
                    <h1 className={styles.title}>Whitelist</h1>
                    <p className={styles.text}>Give yourself a chance to win the sacred NFT.</p>
                    <p className={styles.text}>Push the button on the right.</p>
                </div>
                <a className={styles.button}>participate</a>
                <div className={styles.ellipse}/>
            </div>)
} 

export default About