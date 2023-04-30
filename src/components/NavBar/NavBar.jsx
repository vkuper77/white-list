import { NAV_BAR_PAGES } from "@/src/constants/content-page";
import styles from "@/styles/NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.header__menu} _content`}>
        <ul className={styles.menu__list}>
          {NAV_BAR_PAGES.map((el) => {
            return (
              <li
                key={el.id}
                className={`${styles.menu__item} ${
                  el.id === 3 ? styles.menu__active : null
                }`}
              >
                <a
                  href={el.href}
                  className={`${styles.link} ${
                    el.id === 3 ? styles.menu__active : null
                  }`}
                >
                  {el.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

// <ul className={styles.container}>
//     {NAV_BAR_PAGES.map((page, idx, arr) =>
//         (<li key={page.id} className={
//              !!idx && idx !== arr.length -1 ?
//              page.id === 4 ?
//              styles.indentation__specific :
//              styles.indentation__default :
//              styles.indentation__specific_wrap}>
//             <a href={page.href} className={styles.link}>{page.title}</a>
//         </li>)
//     )}
// </ul>)

export default NavBar;
