import styles from "@/styles/Petition.module.css"

const Notification = ({success = true}) => {
    let styleContainer = styles.container__notification
    let styleText = styles.text__notification

    if(!success) {
        styleContainer += ` ${styles.container__notification__error}`
        styleText += ` ${styles.text__notification__error}`
    }

    return <div className={styleContainer}>
                <p className={styleText}>You successfully</p>
                <p className={styleText}>signed the petition</p>
            </div>
}

export default Notification