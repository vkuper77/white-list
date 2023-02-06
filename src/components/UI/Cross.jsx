import styles from "@/styles/Cross.module.css"

const Cross = () => {
    return <div className={styles.container}>
        <div className={`${styles.wand} ${styles.first}`}/>
        <div className={`${styles.wand} ${styles.second}`}/>
    </div>
}
export default Cross