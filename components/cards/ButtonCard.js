import styles from "./ButtonCard.module.css";
import Image from "next/image";
import GradeCategory from "./info/GradeCategory";
import Button from "../buttons/Button";
import classNames from "classnames";
import { useEffect, useState } from "react";
import ModalContainer from "../modal/ModalContainer";
import ExchangeAuth from "../modal/contents/ExchangeAuth";

/**
 *
 * @param style - "refuse-approval", "cancel"
 *
 * 사용법
 * ex)
 * <ButtonCard style={"refuse-approval"}/>
 * <ButtonCard style={"cancel"}/>
 *
 */

export default function ButtonCard({ style, card, onClick, purchase, price }) {
  const [isMobile, setIsMobile] = useState(false); // 모바일 뷰 감지 상태
  const [exchangeAuth, setExchangeAuth] = useState(null);

  // 창 크기를 감지하여 모바일인지 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743); // 743px 이하일 때 모바일로 간주
    };

    // 컴포넌트가 마운트되면 실행
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 실행 시 호출

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDecline = () => {
    setExchangeAuth("거절");
  };

  const isApproval = () => {
    setExchangeAuth("승인");
  };

  const isModalClose = () => {
    setExchangeAuth(null);
  };

  const buttonContainerClass = classNames({
    [styles[style]]: style,
  });

  // true일 때 '거절하기'와 '승인하기' , false일 때 '취소하기 버튼
  const buttonChoice = style === "refuse-approval";

  return (
    <>
      <div className={styles["card-container"]}>
        <div className={styles["card-info-container"]}>
          <Image
            src={card.image}
            className={styles["card-image"]}
            width={360}
            height={270}
            alt="card-image"
            priority
          />
          <div className={styles["card-information"]}>
            <p className={styles["card-title"]}>{card.name}</p>
            <div className={styles["card-information-wrapper"]}>
              <GradeCategory
                style={"small"}
                grade={card.grade}
                genre={card.genre}
                purchase={purchase}
                price={price}
              />
              <p className={styles["card-nickname"]}>{card.creatorNickname}</p>
            </div>
          </div>
          <div className={styles["card-content-container"]}>
            <div>{card.description}</div>
          </div>
        </div>
        <div className={buttonContainerClass}>
          {buttonChoice ? (
            <>
              <Button
                style={"thin-gray-170px"}
                text={isMobile ? "거절" : "거절하기"}
                onClick={isDecline}
              />
              <Button
                style={"thin-main-170px"}
                text={isMobile ? "승인" : "승인하기"}
                onClick={isApproval}
              />
            </>
          ) : (
            <Button
              style={"thin-gray-360px"}
              text={"취소하기"}
              onClick={onClick}
            />
          )}
        </div>
      </div>
      {exchangeAuth && (
        <ModalContainer onClick={isModalClose}>
          <ExchangeAuth
            exchangeAuth={exchangeAuth}
            card={card}
            isModalClose={isModalClose}
          />
        </ModalContainer>
      )}
    </>
  );
}
