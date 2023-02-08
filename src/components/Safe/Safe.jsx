import styles from "@/styles/Safe.module.css"
import Days from "./Days/Days"
import Wallet from "./Wallet/Wallet"

const Safe = () => {
    return (<div className={styles.card} id="safe">
                <h1 className={styles.card__title}>Safe</h1>
                <p className={styles.card__subtitle}>Helps people to stay HODL</p>
                <p className={styles.card__subtitle}>through the bear market</p>
                <div className={styles.cards}>
                    <Wallet />
                    <Days />
                </div>
                <div className={styles.ellipse__header} />
                <div className={styles.background__card}/>
                <div className={styles.ellipse__footer__left} />
                <div className={styles.ellipse__footer__right} />
            </div>)
}

export default Safe