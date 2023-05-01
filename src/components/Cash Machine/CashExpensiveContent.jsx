import { memo, useState } from "react";
import styles from "@/styles/CashMachine.module.css";
import Modal from "../UI/Modal";
import Form from "../Form/Form";

const CashExpensiveContent = ({ pending }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handlerClick = (e) => {
    e.target.dataset.action === "close" && setIsVisible(false);
  };
  return (
    <>
      <div id="cash_machine" className={styles.wrapper}>
        <div className={`${styles.container} _content`}>
          <h3 className={styles.title}>Cash</h3>
          <h3 className={`${styles.title} ${styles.title__black}`}>Machine</h3>
          <div className={styles.exchange}>
            <a
              onClick={() => {
                setIsVisible(true);
              }}
              className={styles.exchange__button}
            >
              {pending ? "pending..." : "exchange"}
            </a>
            <div className={styles.exchangee__info}>
              <span className={styles.exchange__info__text}>fixed rate:</span>
              <span
                className={styles.exchange__info__text}
                style={{ marginTop: "1.1rem" }}
              >
                1 ETH = 0.7 USDT
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal isVisible={isVisible} callback={handlerClick}>
        <Form
          callback={() => {
            setIsVisible(false);
          }}
        />
      </Modal>
    </>
  );
};

export default memo(CashExpensiveContent);
