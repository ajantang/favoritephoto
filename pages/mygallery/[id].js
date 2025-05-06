import styles from "@/styles/Detail.module.css";
import Image from "next/image";
import GradeCategory from "@/components/cards/info/GradeCategory";
import Button from "@/components/buttons/Button";
import { useState, useEffect } from "react";
import ModalContainer from "@/components/modal/ModalContainer";
import CardList from "@/components/modal/contents/CardList";
import CardSell from "@/components/modal/contents/CardSell";
import { useRouter } from "next/router";
import { useUsersMyCardsQuery } from "@/lib/reactQuery/useUsers";
import Loading from "@/components/loading/Loading";

export default function Detail() {
  const [showMyGallery, setShowMyGallery] = useState(false);
  const [sellMyCard, setSellMyCard] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useUsersMyCardsQuery({
    id,
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className={styles["loading-container"]}>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  const myGalleryModalClick = () => {
    setShowMyGallery(!showMyGallery);
    setSellMyCard(false);
  };

  const sellModalClick = () => {
    setShowMyGallery(false);
    setSellMyCard(!sellMyCard);
  };

  return (
    <>
      <div className={styles["detail-container"]}>
        <div className={styles["detail-title"]}>{data?.data.name}</div>
        <div className={styles["detail-main-container"]}>
          <Image
            src={data?.data.image}
            width={960}
            height={720}
            alt="card-image"
          />
          <div className={styles["info-container"]}>
            <div className={styles["title"]}>
              <GradeCategory
                style="medium"
                genre={data?.data.genre}
                grade={data?.data.grade}
              />
              <span className={styles["nickname"]}>{data?.data.nickname}</span>
            </div>
            <div className={styles["content"]}>{data?.data.description}</div>
            <div className={styles["bottom-container"]}>
              <div className={styles["price-container"]}>
                <span className={styles["price"]}>가격</span>
                <span className={styles["number-price"]}>
                  {data?.data.price} P
                </span>
              </div>
              <div className={styles["count-container"]}>
                <span className={styles["count"]}>보유량</span>
                <span className={styles["number-count"]}>
                  {data?.data.quantity}
                </span>
              </div>
              <div className={styles["detail-btn"]}>
                <Button
                  text={"포토카드 판매하기"}
                  style={"thick-main-440px"}
                  onClick={myGalleryModalClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMyGallery && (
        <ModalContainer onClick={myGalleryModalClick}>
          <CardList title={"나의 포토카드 판매하기"} onClick={sellModalClick} />
        </ModalContainer>
      )}
      {sellMyCard && (
        <ModalContainer onClick={sellModalClick}>
          <CardSell myGalleryModalClick={myGalleryModalClick} />
        </ModalContainer>
      )}
    </>
  );
}
