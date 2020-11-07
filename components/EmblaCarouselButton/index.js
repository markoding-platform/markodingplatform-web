import React from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import styles from './styles.module.scss'

export const DotButton = ({ selected, onClick }) => (
  <button
    type="button"
    className={selected ? `${styles.embla__dot} ${styles.isSelected}` : `${styles.embla__dot}`}
    onClick={onClick}
  />
);

export const PrevButton = ({ enabled, onClick }) => (
  <button
    type="button"
    className={styles.embla__button}
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDropleftCircle className={styles.embla__button__icon} />
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    type="button"
    className={styles.embla__button}
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDroprightCircle className={styles.embla__button__icon} />
  </button>
);
