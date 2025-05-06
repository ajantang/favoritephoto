import { useRouter } from "next/router";
import styles from "@/components/cards/Card.module.css";
import Image from "next/image";
import GradeCategory from "./info/GradeCategory";
import { useEffect, useState } from "react";

export default function Card({ onClick, card, quantity }) {
  const [isSelling, setIsSelling] = useState("card-sellout-no");
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (card.sellout) {
      setIsSelling("card-sellout");
    }
  }, []);

  const isInMyGallery = window.location.pathname.includes("/mygallery");

  return (
    <>
      <div className={styles["card-container"]} onClick={onClick}>
        <Image
          src={card.image}
          className={styles["card-image"]}
          width={360}
          height={270}
          alt="card-image"
          priority
        />
        {!isInMyGallery && (
          <div className={styles[isSelling]}>
            <Image
              src="/sellout-icon.svg"
              width={230}
              height={230}
              alt="sellout-img"
            />
          </div>
        )}
        {pathname === "/mysales" && (
          <div
            className={styles["card-state"]}
            style={{
              color: card.hasExchangeRequest ? "var(--main)" : "inherit",
            }}
          >
            {card.hasExchangeRequest ? "교환 제시 대기 중" : "판매 중"}
          </div>
        )}
        <div className={styles["card-information"]}>
          <p className={styles["card-title"]}>{card.name}</p>
          <div className={styles["card-information-wrapper"]}>
            <GradeCategory
              style={"small"}
              grade={card.grade}
              genre={card.genre}
            />
            <p className={styles["card-nickname"]}>{card.creatorNickname}</p>
          </div>
        </div>
        <div className={styles["card-price-wrapper"]}>
          <p className={styles["card-price-tag"]}>가격</p>
          <p className={styles["card-price"]}>{card.price} P</p>
        </div>
        <div className={styles["card-stock-wrapper"]}>
          <p className={styles["card-stock-tag"]}>
            {quantity ? "수량" : "잔여"}
          </p>
          <p className={styles["card-stock"]}>
            {quantity ? (
              card.price
            ) : (
              <>
                {isInMyGallery ? card.quantity : card.remainingQuantity}
                {!isInMyGallery && (
                  <span className={styles["card-stock-denominator"]}>
                    / {card.totalQuantity}
                  </span>
                )}
              </>
            )}
          </p>
        </div>
        <Image
          src="/logo.svg"
          width={99.25}
          height={18}
          alt="logo"
          className={styles["card-logo"]}
        />
      </div>
    </>
  );
}
