import styles from "@/styles/Form.module.css"
import Cross from "../UI/Cross"

const Form = () => {
    return null
    return <div className={styles.container}>
            <form className={styles.form__container}>
                <div className={styles.cross}>
                    <Cross />
                </div>
                <div className={styles.nput__group}>
                    <label className={styles.input__group__label} htmlFor="eth">eth:</label>
                    <input className={styles.input__group__input} type="text" name="eth" id="eth" required/>
                </div>
                <div className={styles.nput__group}>
                    <label className={styles.input__group__label} htmlFor="usdt">usdt:</label>
                    <input className={styles.input__group__input} type="text" name="usdt" id="usdt" required/>
                </div>
                    <span className={styles.info__label}>1 ETH = 0.7 USDT</span>
                <input className={styles.button__submit} type="submit" value="exchange"/>
            </form>
    </div> 
}

export default Form