import styles from "./checkBoxRetro.module.css";

export default function CheckBoxRetro() {
  return (
    <div className={styles.wrapper}>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider} />
      </label>
    </div>
  );
}
