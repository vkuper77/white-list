import { DESCRIPTION } from "@/src/constants/content-page";
import styles from "@/styles/Description.module.css";

const Description = () => {
  return (
    <div id="description" className={`${styles.conatiner} _content`}>
      <h3 className={styles.title}>Description</h3>
      <div className={styles.main}>
        {DESCRIPTION.map((info) => (
          <div key={info.id}>
            <span className={styles.sub__title}>{info.title}</span>
            <span className={styles.text}>{info.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
