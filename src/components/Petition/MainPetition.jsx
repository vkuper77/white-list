import styles from "@/styles/Petition.module.css";
import { useSelector } from "react-redux";
import moment from "moment/moment";

const MainPetition = () => {
  const { addresses } = useSelector((state) => state);
  return (
    <div className={styles.main}>
      <div className={styles.main___container__transaction}>
        <p className={styles.main___container__transaction__title}>address</p>
        <div className={styles.main___container__list}>
          <ul className={styles.list}>
            {addresses.map((addr, idx) => (
              <li
                key={addr["from"]}
                className={styles.main___container__transaction__text}
              >
                <span>{idx + 1}.</span>&nbsp;
                <span>{addr["from"]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.main___container__date}>
        <p className={styles.main___container__date__title}>date</p>
        <ul>
          {addresses.map((addr) => (
            <li
              key={addr["timestamp"]}
              className={styles.main___container__date__text}
            >
              {moment.unix(addr["timestamp"]).format("DD.MM.YY")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPetition;
