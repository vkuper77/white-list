import styles from "@/styles/Petition.module.css"
import HeaderPetition from "./HeaderPetition"
import MainPetition from "./MainPetition"
import Notification from "../UI/Notification"

const Petition = () => {
    return (
        <div id='petition' className={styles.container}>
            <HeaderPetition />
            <MainPetition />
        </div>
    )
}

export default Petition