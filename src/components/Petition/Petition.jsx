import styles from "@/styles/Petition.module.css"
import HeaderPetition from "./HeaderPetition"
import MainPetition from "./MainPetition"
import Notification from "./Notification"

const Petition = () => {
    return (
        <div id='petition' className={styles.container}>
            <HeaderPetition />
            <MainPetition />
            <Notification />
        </div>
    )
}

export default Petition