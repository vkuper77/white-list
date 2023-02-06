import styles from "@/styles/CashMachine.module.css"

const CashMachine = () => {
    return (<div id="cash_machine" className={styles.container}>
                <h1 className={styles.title}>Cash</h1>
                <h1 className={`${styles.title} ${styles.title__black}`}>Machine</h1>
                <div className={styles.exchange}>
                    <a className={styles.exchange__button}>exchange</a>
                    <div className={styles.exchangee__info}>
                        <span className={styles.exchange__info__text}>fixed rate:</span>
                        <span className={styles.exchange__info__text}>1 ETH = 0.7 USDT</span>
                    </div>
                </div>
           </div>)
}
export default CashMachine