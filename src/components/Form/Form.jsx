import styles from "@/styles/Form.module.css"
import { useState } from "react"
import Cross from "../UI/Cross"

const Form = ({isFormSafe = false, callback = () => {}}) => {
    const [ethValue, setEthValue] = useState('')
    const [USDTValue, setUSDTValue] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(
            (isFormSafe && Number(ethValue) <= 0) || 
            (!isFormSafe && (Number(ethValue) <= 0  || Number(USDTValue) <= 0)) 
            ) {
            return
        }
        callback(ethValue, USDTValue)
        setEthValue('')
        setUSDTValue('')
    }

    return <div className={styles.container}>
            <form action="#" method="POST" className={styles.form__container} onSubmit={onSubmit}>
                <div data-action="close" className={styles.cross}>
                    <Cross />
                </div>
                <div className={styles.nput__group}>
                    <label className={styles.input__group__label} htmlFor="eth">eth:</label>
                    <input 
                        value={ethValue} 
                        onChange={({target}) => {setEthValue(target.value) }} 
                        className={styles.input__group__input} 
                        type="number" 
                        name="eth" 
                        id="eth"
                        required
                    />
                </div>
                {!isFormSafe && <>
                        <div className={styles.nput__group}>
                            <label className={styles.input__group__label} htmlFor="usdt">usdt:</label>
                            <input 
                                value={USDTValue} 
                                onChange={({target}) => {setUSDTValue(target.value)}} 
                                className={styles.input__group__input} 
                                type="number" 
                                name="usdt" 
                                id="usdt" 
                                required
                            />
                        </div>
                        <span className={styles.info__label}>1 ETH = 0.7 USDT</span>
                        <input value="exchange" className={styles.button__submit} type="submit"/>
                    </>
                }
                {isFormSafe && <div className={styles.btn__group}>
                    <input data-action="submit" className={styles.button__submit} type="submit" value="confirm"/>
                    <input 
                        data-action="close" 
                        className={`${styles.button__submit} ${styles.canchel_btn}`} 
                        type="reset" 
                        value="cancel"
                    />
                </div> }
            </form>
    </div> 
}

export default Form