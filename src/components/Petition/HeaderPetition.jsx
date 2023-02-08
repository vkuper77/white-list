import { AppContext } from "@/src/context/app-context"
import styles from "@/styles/Petition.module.css"
import { useContext } from "react"

const HeaderPetition = () => {
    const {sign} = useContext(AppContext)
    return <>
            <div className={styles.header_container}>
                <p className={styles.small_title}>public</p>
                <h1 className={styles.title}>petition</h1>
                <a onClick={sign} className={styles.button}>sign</a>
                <p className={styles.text}>signs quantity: 1</p>
            </div>
        </> 
}

export default HeaderPetition

 // const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
 // console.log(accounts)