import { memo } from "react";
import styles from "@/styles/About.module.css";

const AboutExpensiveConten = ({ collback, pending, isRecordedWhiteList }) => (
  <div id="connect_wallet" className={styles.wrapper}>
    <div className={`${styles.container} _content`}>
      <div>
        <h1 className={styles.title}>Whitelist</h1>
        <p className={styles.text}>
          Give yourself a chance to win the sacred NFT.
        </p>
        <p className={styles.text}>Push the button on the right.</p>
      </div>

      <a onClick={collback} className={styles.button}>
        <span>
          {isRecordedWhiteList
            ? `you are in WL`
            : pending
            ? "pending..."
            : "participate"}
        </span>
      </a>
    </div>
    <div className={styles.ellipse} />
  </div>
);

export default memo(AboutExpensiveConten);
