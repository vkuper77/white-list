import { memo } from "react";
import styles from "@/styles/Petition.module.css";

const ExpensiveConten = ({ pending, collback, isSigned, addresses }) => (
  <div className={styles.header_container}>
    <span className={styles.small_title}>public</span>
    <h3 className={styles.title}>petition</h3>
    <a onClick={collback} className={styles.button}>
      <span>
        {isSigned ? "you are logged in" : pending ? "pending..." : "sign"}
      </span>
    </a>
    <span className={styles.text}>signs quantity: {addresses.length}</span>
  </div>
);

export default memo(ExpensiveConten);
