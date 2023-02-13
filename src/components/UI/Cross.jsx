import styles from "@/styles/Cross.module.css"

const Cross = () => {
    return <div data-action="close" className={styles.container}>
        <div data-action="close" className={`${styles.wand} ${styles.first}`}/>
        <div data-action="close" className={`${styles.wand} ${styles.second}`}/>
    </div>
}
export default Cross