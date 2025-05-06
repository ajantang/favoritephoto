import styles from "./CardInfo.module.css";
import GradeCategory from "@/components/cards/info/GradeCategory";

export default function CardInfo({ card }) {
  console.log(card);
  return (
    <div className={styles["info-container"]}>
      <div className={styles["title"]}>
        <GradeCategory style="medium" grade={card.grade} genre={card.genre} />
        <span className={styles["nickname"]}>{card.creatorNickname}</span>
      </div>
      <div className={styles["content"]}>{card.description}</div>
      <div className={styles["bottom-container"]}>
        <div className={styles["price-container"]}>
          <span className={styles["price"]}>가격</span>
          <span className={styles["number-price"]}>{card.price} p</span>
        </div>
        <div className={styles["count-container"]}>
          <span className={styles["count"]}>잔여</span>
          <span className={styles["number-count"]}>
            {card.remainingQuantity}{" "}
            <span className={styles["all-number-count"]}>
              / {card.totalQuantity}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
