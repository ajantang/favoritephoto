import styles from "@/components/modal/ModalContainer.module.css";
import classNames from "classnames";
import Image from "next/image";

/**
 *
 * @param children - component
 * @param onClick - togle
 * @param option - option : drag, click
 */
export default function ModalContainer({ children, onClick, option }) {
  const overlayClass = classNames(styles["overlay"], styles[option]);
  const containerClass = classNames(styles["container"], styles[option]);

  return (
    <div className={overlayClass}>
      <div className={containerClass}>
        <div className={styles["close-button"]} onClick={onClick}>
          <Image src={"/close-button.svg"} fill alt="close-button" />
        </div>
        {option && (
          <>
            <div className={styles["close-tablet-button"]} onClick={onClick} />
            <div className={styles["close-mobile-button"]} onClick={onClick}>
              <Image src={"/close-button-mobile.svg"} fill alt="close-button" />
            </div>
          </>
        )}
        {children}
      </div>
    </div>
  );
}
