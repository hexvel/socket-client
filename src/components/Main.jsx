import styles from "../styles/Main.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Войти</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              placeholder="Введите ник"
              value={values[NAME]}
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              placeholder="Введите комнату"
              value={values[ROOM]}
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <Link
            onClick={handleClick}
            className={styles.group}
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
          >
            <button className={styles.button} type="submit">
              Перейти в комнату
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
