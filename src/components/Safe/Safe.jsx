import styles from "@/styles/Safe.module.css"

const Safe = () => {
    return (<div className={styles.card} id="safe">
                <h1 className={styles.card__title}>Safe</h1>
                <p className={styles.card__subtitle}>Helps people to stay HODL</p>
                <p className={styles.card__subtitle}>through the bear market</p>
                <div className={styles.cards}>
                    <div className={styles.card__left}>
                        <p className={styles.card__subtitle}>wallet balance:</p>
                        <p className={`${styles.card__subtitle} ${styles.text__balance}`}>2.663 ETH</p>
                        <a className={styles.button}>add</a>
                    </div>
                    <div>
                        <p className={styles.card__right__title}>9:22:26:8</p>
                        <p className={styles.card__subtitle}>days</p>
                        <p className={styles.card__subtitle}>to your money is unlocked</p>
                    </div>
                </div>
                <div className={styles.ellipse__header} />
                <div className={styles.background__card}/>
                <div className={styles.ellipse__footer__left} />
                <div className={styles.ellipse__footer__right} />
            </div>)
}

export default Safe