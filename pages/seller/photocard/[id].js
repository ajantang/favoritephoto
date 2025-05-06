import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/SellerPhotoCardDetail.module.css";
import Button from "@/components/buttons/Button";
import GradeCategory from "@/components/cards/info/GradeCategory";
import CardInfo from "@/components/cards/CardInfo";
import defaultImg from "@/public/default-test-img.svg";
import EditExchangeInfo from "@/components/cards/EditExchangeInfo";
import ButtonCard from "@/components/cards/ButtonCard";
import ModalContainer from "@/components/modal/ModalContainer";
import CardEdit from "@/components/modal/contents/CardEdit";
import { getShopCard } from "@/lib/api/shop";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const cookies = context.req.headers.cookie || "";

  const shopCard = await getShopCard({ shopId: id, cookies });

  return {
    props: {
      shop: shopCard,
      card: shopCard.shopInfo,
      exchangeInfo: shopCard.exchangeInfo,
      exchangeList: shopCard.exchangeList,
    },
  };
}

export default function Index({ shop, card, exchangeInfo, exchangeList, c }) {
  const [editModal, setEditModal] = useState(false);

  // const asd = async () => {
  //   const shopCard = await getShopCard("3860b272-c816-4f52-bf09-1e0227f639ee");
  //   console.log(shopCard);
  // };

  const editModalClick = () => {
    setEditModal(!editModal);
  };

  console.log(shop);
  console.log(card);
  console.log(exchangeList);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["market-place"]}>마켓플레이스</div>
        <div className={styles["title"]}>{card.name}</div>
        <div className={styles["info-cotainer"]}>
          <Image
            src={card.image}
            width={960}
            height={720}
            alt="photocard-image"
          />
          <div className={styles["info-content-container"]}>
            <CardInfo style={styles.medium} card={card} />
            <EditExchangeInfo
              editModalClick={editModalClick}
              card={card}
              exchangeInfo={exchangeInfo}
            />
          </div>
        </div>
        <div className={styles["title"]}>교환 제시 목록</div>
        {exchangeList.length > 0 ? (
          <div className={styles["exchange-container"]}>
            {exchangeList.map((card) => (
              <ButtonCard
                key={card.id}
                style={"refuse-approval"}
                card={card}
                purchase={"purchase"}
                price={card.pirce}
              />
            ))}
          </div>
        ) : (
          <div className={styles["blank"]}>교환 제시 목록이 텅 비었습니다.</div>
          // <ButtonCard style={"refuse-approval"} card={card} />
        )}
      </div>
      {editModal && (
        <ModalContainer onClick={editModalClick}>
          <CardEdit
            editModalClick={editModalClick}
            exchangeInfo={exchangeInfo}
            card={card}
          />
        </ModalContainer>
      )}
    </>
  );
}
