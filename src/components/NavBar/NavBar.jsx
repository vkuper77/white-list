
import { NAV_BAR_PAGES } from "@/src/constants/content-page"
import styles from "@/styles/NavBar.module.css"

const NavBar = () =>  (
    <ul className={styles.container}>
        {NAV_BAR_PAGES.map((page, idx, arr) =>
            (<li key={page.id} className={Boolean(idx) && idx !==  arr.length-1 ? page.id === 4 ? styles.indentation__specific : styles.indentation__default : ''}>
                <a href={page.href} className={styles.link}>{page.title}</a>
            </li>)
        )}
    </ul>)

export default NavBar 