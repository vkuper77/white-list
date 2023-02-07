import styles from "@/styles/Petition.module.css"
import { useEffect } from "react";

const HeaderPetition = () => {

    useEffect(() => {
        function loadProvider(){
        
         }
     
         loadProvider()
       }, [])

    return <>
            <div className={styles.header_container}>
                <p className={styles.small_title}>public</p>
                <h1 className={styles.title}>petition</h1>
                <a onClick={async () => {
                    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                    console.log(accounts)
                }} className={styles.button}>sign</a>
                <p className={styles.text}>signs quantity: 1</p>
            </div>
        </> 
}

export default HeaderPetition