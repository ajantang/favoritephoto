import classNames from "classnames";
import Image from "next/image";
import styles from "./QuantityButton.module.css";
import plus from "@/public/plus-icon.svg";
import minus from "@/public/minus-icon.svg";
import { useState } from "react";

/**
 * @param style
 * 1. width-176px
 * 2. width-139px
 *
 * ex) <QuantityButton style={"width-176px"}/>
 */

export default function QuantityButton({ style, setNum, num, maxQuantity }) {
  const QuantityWidth = classNames({
    [styles[style]]: style,
  });

  const handlePlus = () => {
    if (num < maxQuantity) {
      setNum(num + 1);
    } else if (!maxQuantity) {
      setNum(num + 1);
    }
  };

  const handleMinus = () => {
    if (num > 1) {
      setNum(num - 1);
    } else return;
  };

  return (
    <div className={QuantityWidth}>
      <Image
        src={minus}
        className={styles["sign"]}
        onClick={handleMinus}
        alt="minus"
      />
      <span>{num}</span>
      <Image
        src={plus}
        className={styles["sign"]}
        onClick={handlePlus}
        alt="plus"
      />
    </div>
  );
}
