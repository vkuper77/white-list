import styles from "@/styles/Safe.module.css";
import Days from "./Days/Days";
import Wallet from "./Wallet/Wallet";

const Safe = ({ children }) => {
  return (
    <div className={styles.wrapper} id="safe">
      <div className={`${styles.card} _content`}>
        <h3 className={styles.card__title}>Safe</h3>
        <span className={styles.card__subtitle}>Helps people to stay HODL</span>
        <span className={styles.card__subtitle}>through the bear market</span>
        <div className={styles.cards}>
          <Wallet />
          <Days />
        </div>
        <div className={styles.ellipse__footer__left} />
        <div className={styles.ellipse__footer__right} />
      </div>
      {children}
      <div className={styles.ellipse__header} />
      <div className={styles.background__card} />
    </div>
  );
};

export default Safe;
