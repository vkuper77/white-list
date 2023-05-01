import { memo } from "react";
import styles from "@/styles/Safe.module.css";
import { useSelector } from "react-redux";

const WalletExpensiveConten = ({ callback, pending }) => {
  const { balance, timeLeft, isLockedButton } = useSelector((state) => state);
  return (
    <div className={styles.card__left}>
      <span className={styles.card__left__subtitle}>wallet balance:</span>
      <span
        className={`${styles.card__left__subtitle} ${styles.text__balance}`}
      >
        {balance} ETH
      </span>
      <a
        onClick={callback}
        className={`${styles.button} ${
          isLockedButton ? styles.button__disabled : ""
        }`}
      >
        {pending
          ? "pending..."
          : Boolean(Number(timeLeft["amount"]))
          ? "take"
          : "add"}
      </a>
    </div>
  );
};

export default memo(WalletExpensiveConten);
