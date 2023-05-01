import styles from "@/styles/Form.module.css";
import { useEffect, useState } from "react";
import Cross from "../UI/Cross";

const Form = ({ isFormSafe = false, callback = () => {} }) => {
  const [ethValue, setEthValue] = useState("0");
  const [USDTValue, setUSDTValue] = useState("0");

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      (isFormSafe && Number(ethValue) <= 0) ||
      (!isFormSafe && (Number(ethValue) <= 0 || Number(USDTValue) <= 0))
    ) {
      return;
    }
    callback(ethValue, USDTValue);
    setEthValue("");
    setUSDTValue("");
  };

  return (
    <div className={styles.container}>
      <form
        action="#"
        method="POST"
        className={styles.form__container}
        onSubmit={onSubmit}
      >
        <div data-action="close" className={styles.cross}>
          <Cross />
        </div>
        <div className={styles.input__group}>
          <label className={styles.input__group__label} htmlFor="eth">
            eth:
          </label>
          <input
            value={ethValue}
            onChange={({ target }) => {
              setEthValue(target.value);
              if (!isFormSafe) {
                setUSDTValue(Number(target.value) * 0.7);
              }
            }}
            className={styles.input__group__input}
            style={{ marginBottom: "2.5rem" }}
            type="number"
            name="eth"
            id="eth"
            required
          />
        </div>
        {!isFormSafe && (
          <>
            <div className={styles.input__group}>
              <label className={styles.input__group__label} htmlFor="usdt">
                usdt:
              </label>
              <input
                value={USDTValue}
                onChange={({ target }) => {
                  setUSDTValue(target.value);
                  if (!isFormSafe) {
                    setEthValue(Number(target.value) / 0.7);
                  }
                }}
                className={styles.input__group__input}
                type="number"
                name="usdt"
                id="usdt"
                required
              />
            </div>
            <span className={styles.info__label}>1 ETH = 0.7 USDT</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2.05rem",
                overflow: "hidden",
              }}
            >
              <input
                value="exchange"
                className={styles.button__submit}
                type="submit"
              />
            </div>
          </>
        )}
        {isFormSafe && (
          <div className={styles.btn__group}>
            <input
              data-action="submit"
              className={styles.button__submit}
              type="submit"
              value="confirm"
            />
            <input
              data-action="close"
              className={`${styles.button__submit} ${styles.canchel_btn}`}
              type="reset"
              value="cancel"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
