
import styles from "@/styles/NavBar.module.css"

const NAV_BAR_PAGES = [
    {id: 1, title: 'petition', href: '#petition'}, 
    {id: 2, title: 'cash machine', href: '#cash_machine'},
    {id: 3, title: 'connect wallet', href: '#connect_wallet'},
    {id: 4, title: 'safe', href: '#safe'},
    {id: 5, title: 'description', href: '#description'}
    ]

const NavBar = () => {
    return (<ul className={styles.container}>
                        {NAV_BAR_PAGES.map((page, idx, arr) =>
                            (<li key={page.id} className={Boolean(idx) && idx !==  arr.length-1 ? page.id === 4 ? styles.indentation__specific : styles.indentation__default : ''}>
                                <a href={page.href} className={styles.link}>{page.title}</a>
                            </li>)
                        )}
                     </ul>)}

export default NavBar 