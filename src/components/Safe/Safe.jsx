import styles from "@/styles/Safe.module.css"

const Safe = () => {
    return (<div className={styles.card} id="safe">
                <h1 className={styles.card__title}>Safe</h1>
                <p className={styles.card__subtitle}>Helps people to stay HODL</p>
                <p className={styles.card__subtitle}>through the bear market</p>
                <div>
                    <div>
                        <p className={styles.card__subtitle}>wallet balance:</p>
                        <p className={styles.card__subtitle}>2.663 ETH</p>
                        <a>add</a>
                    </div>
                    <div>
                        <p className={styles.card__right__title}>9:22:26:8</p>
                        <p className={styles.card__subtitle}>days</p>
                        <p className={styles.card__subtitle}>to your money is unlocked</p>
                    </div>
                </div>
            </div>)
}

export default Safe