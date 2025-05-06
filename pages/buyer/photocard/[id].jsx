import Button from "@/components/buttons/Button";
import Image from "next/image";
import styles from "@/pages/buyer/photocard/[id].module.css";
import GradeCategory from "@/components/cards/info/GradeCategory";
import ModalContainer from "@/components/modal/ModalContainer";
import { useState } from "react";
import DefaultContent from "@/components/modal/contents/DefaultContent";
import CardList from "@/components/modal/contents/CardList";
import CardExchange from "@/components/modal/contents/CardExchange";
import QuantityButton from "@/components/buttons/QuantityButton";
import { getShopCard } from "@/lib/api/shop";
import ButtonCard from "@/components/cards/ButtonCard";
import { useUsersMyCardListQuery } from "@/lib/reactQuery/useUsers";
import useAuthStore from "@/store/useAuthStore";
import useSelectedStore from "@/store/useSelectedStore";
import {
  useCreateExchangeRequest,
  usePurchaseShopCard,
} from "@/lib/reactQuery/useShop";
import { useDeleteExchange } from "@/lib/reactQuery/useExchange";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = context.req.headers.cookie || "";
  const shopCard = await getShopCard({ shopId: id, cookies });

  if (shopCard.shopInfo.isOwner) {
    return {
      redirect: {
        destination: `/seller/photocard/${shopCard.shopInfo.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      card: shopCard.shopInfo ?? null,
      exchangeInfo: shopCard.exchangeInfo ?? null,
      exchangeList: shopCard.exchangeList ?? null,
    },
  };
}

export default function Index({ card, exchangeList, exchangeInfo }) {
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [exchangeModal, setExchangeModal] = useState(false);
  const [exchangeDetailModal, setExchangeDetailModal] = useState(false);
  const [description, setDescription] = useState("");
  const [modalSearch, setModalSearch] = useState("");
  const [num, setNum] = useState(1);
  const [params, setParams] = useState({
    sort: "recent",
    genre: "",
    grade: "",
    pageNum: 1,
    pageSize: 9,
    keyword: modalSearch || "",
  });

  const { user } = useAuthStore();
  const { selectedCard, setSelectedCard } = useSelectedStore();

  const exchangeMutation = useCreateExchangeRequest();
  const exchangeCancelMutation = useDeleteExchange();
  const purchaseCardMuatation = usePurchaseShopCard();

  const { data, isLoading, error } = useUsersMyCardListQuery({
    ...params,
    user,
  });

  const purchaseModalClick = () => {
    setExchangeDetailModal(false);
    setPurchaseModal(!purchaseModal);
    setExchangeModal(false);
  };

  const exchangeModalClick = () => {
    setExchangeDetailModal(false);
    setPurchaseModal(false);
    setExchangeModal(!exchangeModal);
    if (exchangeModal === false) {
      setSelectedCard(null);
    }
  };

  const exchangeDetailModalClick = () => {
    setExchangeDetailModal(!exchangeDetailModal);
    setExchangeModal(false);
    setPurchaseModal(false);
  };

  const selectClick = (card) => {
    setSelectedCard(card);
    exchangeDetailModalClick();
  };

  const exchangeClick = () => {
    exchangeMutation.mutate({
      shopId: card.id,
      cardId: selectedCard.id,
      description: description,
    });
  };

  const exchangeOnChange = (e) => {
    setDescription(e.target.value);
  };

  const exchangeCancelClick = (card) => {
    exchangeCancelMutation.mutate({ exchangedId: card.id });
  };

  const purchaseCardClick = () => {
    purchaseCardMuatation.mutate({ shopId: card.id, purchaseQuantity: num });
    setPurchaseModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setParams(() => ({
        keyword: modalSearch,
        pageNum: 1,
      }));
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["market-place"]}>마켓플레이스</div>
        <div className={styles["title"]}>{card?.name}</div>
        <div className={styles["card-container"]}>
          <div className={styles["photocard-image"]}>
            <Image src={card?.image} fill alt="photocard-image" />
          </div>
          <div className={styles["card-info-container"]}>
            <div className={styles["card-header"]}>
              <GradeCategory
                style={"medium"}
                grade={card?.grade}
                genre={card?.genre}
              />
              {card?.creatorNickname}
            </div>
            <div className={styles["bar"]} />
            <div className={styles["card-description"]}>
              {card?.description}
            </div>
            <div className={styles["bar"]} />
            <div className={styles["price-container"]}>
              <div className={styles["price"]}>가격</div>
              <div className={styles["point"]}>{card?.price}P</div>
            </div>
            <div className={styles["remain-container"]}>
              <div className={styles["remain"]}>잔여</div>
              <div className={styles["quantity"]}>
                {card?.remainingQuantity}
                <div
                  className={styles["total"]}
                >{`/${card?.totalQuantity}`}</div>
              </div>
            </div>
            <div className={styles["bar"]} />
            <div className={styles["purchase-quantity-container"]}>
              <div className={styles["purchase-quantity"]}>구매수량</div>
              <QuantityButton style={"width-176px"} setNum={setNum} num={num} />
            </div>
            <div className={styles["total-price-container"]}>
              <div className={styles["total-price"]}>총 가격</div>
              <div className={styles["total-point-card-container"]}>
                <div className={styles["total-point"]}>
                  {num * card?.price}P
                </div>
                <div className={styles["total-card"]}>{`(${num}장)`}</div>
              </div>
            </div>
            <Button
              text={"포토카드 구매하기"}
              style={"thick-main-440px"}
              onClick={purchaseModalClick}
            />
          </div>
        </div>

        <div className={styles["title"]}>
          교환 희망 정보
          <Button
            text={"포토카드 교환하기"}
            style={"thin-main-440px-60px"}
            onClick={exchangeModalClick}
          />
        </div>
        <div className={styles["exchange-container"]}>
          <div className={styles["exchange-content"]}>
            {exchangeInfo?.description}
          </div>
          <GradeCategory
            style={"medium"}
            grade={exchangeInfo?.grade}
            genre={exchangeInfo?.genre}
          />
        </div>
        {exchangeList?.length > 0 && (
          <div className={styles["my-suggest-container"]}>
            <div className={styles["title"]}>내가 제시한 교환 목록</div>
            <div className={styles["my-suggest-card-container"]}>
              {exchangeList.map((card) => (
                <ButtonCard
                  key={card.id}
                  style={"cancel"}
                  card={card}
                  onClick={() => exchangeCancelClick(card)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {purchaseModal && (
        <ModalContainer onClick={purchaseModalClick}>
          <DefaultContent
            style={"default"}
            title={"포토카드 구매"}
            content={"구매하시겠습니까?"}
            buttonContent={"구매하기"}
            buttonStyle={"thin-main-170px"}
            onClick={purchaseCardClick}
          />
        </ModalContainer>
      )}
      {exchangeModal && (
        <ModalContainer onClick={exchangeModalClick} option={"click"}>
          <CardList
            title={"포토카드 교환하기"}
            onClick={selectClick}
            data={data?.data.cards}
            onChange={setModalSearch}
            setParams={setParams}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
          />
        </ModalContainer>
      )}
      {exchangeDetailModal && (
        <ModalContainer onClick={exchangeDetailModalClick} option={"click"}>
          <CardExchange
            onClick={exchangeModalClick}
            exchangeClick={exchangeClick}
            onChange={exchangeOnChange}
          />
        </ModalContainer>
      )}
    </>
  );
}
