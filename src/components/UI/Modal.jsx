import styles from "@/styles/Modal.module.css"

const Modal = ({isVisible, children, callback}) => {
    if(!isVisible) return null
    return <div data-action="close" className={styles.container} onClick={callback}>{children}</div>
}

export default Modal