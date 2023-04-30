import styles from "@/styles/Petition.module.css"
import HeaderPetition from "./HeaderPetition"
import MainPetition from "./MainPetition"

const Petition = () => {
    return (
        <div id='petition' className={`${styles.container} _content`}>
            <HeaderPetition />
            <MainPetition />
        </div>
    )
}

export default Petition