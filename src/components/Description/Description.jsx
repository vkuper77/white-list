import { DESCRIPTION } from "@/src/constants/content-page"
import styles from "@/styles/Description.module.css"

const Description = () => {
    return <div id="description" className={styles.conatiner}>
        <h1 className={styles.title}>Description</h1>
        <div className={styles.main}>
            {DESCRIPTION.map((info) =>  (<div key={info.id}>
                        <h2 className={styles.sub__title}>{info.title}</h2>
                        <p className={styles.text}>{info.text}</p>
                    </div>))}
        </div>
    </div>
}

export default Description

