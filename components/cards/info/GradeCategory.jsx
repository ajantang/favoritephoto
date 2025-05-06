import styles from "@/components/cards/info/GradeCategory.module.css";
import classNames from "classnames";

/**
 * @param style
 * 1. small
 * 2. medium
 * @param grade
 * 0-COMMON, 1-RARE, 2-SUPER RARE, 3-LEGENDARY, default-등급정보없음
 * @param genre
 * 0-풍경, 1-인물, 2-동물, 3-정물, 4-추상, default-기타
 * @param price - 구매가격
 * @param purchase - 구매가격 옵션
 */
export default function GradeCategory({
  style,
  grade,
  genre,
  purchase,
  price,
}) {
  const textStyle = classNames({
    [styles[style]]: style,
  });

  const gradeText =
    grade === 0
      ? "COMMON"
      : grade === 1
      ? "RARE"
      : grade === 2
      ? "SUPER RARE"
      : grade === 3
      ? "LEGENDARY"
      : "등급정보없음";

  const genreText =
    genre === 0
      ? "풍경"
      : genre === 1
      ? "인물"
      : genre === 2
      ? "동물"
      : genre === 3
      ? "정물"
      : genre === 4
      ? "추상"
      : "기타";

  return (
    <div className={textStyle}>
      <div className={styles[gradeText.replace(/\s+/g, "-").toLowerCase()]}>
        {gradeText}
      </div>
      <div className={styles["bar"]}>|</div>
      <div className={styles["category"]}>{genreText}</div>
      {purchase ? (
        <>
          <div className={styles["bar"]}>|</div>
          <div className={styles["purchase"]}>
            <div className={styles["purchase-point"]}>{price} P</div>에 구매
          </div>
        </>
      ) : null}
    </div>
  );
}
