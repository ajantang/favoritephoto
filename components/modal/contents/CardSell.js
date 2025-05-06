import Image from "next/image";
import styles from "./CardEdit.module.css";
import defaultImg from "@/public/default-test-img.svg";
import GradeCategory from "@/components/cards/info/GradeCategory";
import QuantityButton from "@/components/buttons/QuantityButton";
import Input from "@/components/inputs/Input";
import Dropdown from "@/components/dropdowns/Dropdown";
import Button from "@/components/buttons/Button";
import useSelectedStore from "@/store/useSelectedStore";
import { useState } from "react";
import { useCreateShopCard } from "@/lib/reactQuery/useShop";
import { getParamsByOption } from "@/hooks/useGetIndex/useGetIndex";

export default function CardSell({ myGalleryModalClick, sellModalClick }) {
  const { selectedCard } = useSelectedStore();

  const [num, setNum] = useState(selectedCard.quantity);
  const [price, setPrice] = useState(selectedCard.price);
  const [grade, setGrade] = useState(selectedCard.grade);
  const [genre, setGenre] = useState(selectedCard.genre);
  const [exchangeDesc, setExchangeDesc] = useState("");

  const useCreateShopCardMutation = useCreateShopCard();

  const sellData = {
    salesQuantity: num,
    price: Number(price),
    exchangeGrade: grade.grade,
    exchangeGenre: genre.genre,
    exchangeDescription: exchangeDesc,
  };

  console.log(selectedCard);
  console.log(sellData);

  // 판매하기 버튼 클릭 시 호출될 함수
  const handleSellSubmit = () => {
    useCreateShopCardMutation.mutate(
      {
        cardId: selectedCard.id,
        salesQuantity: num,
        price: Number(price),
        exchangeGrade: grade.grade,
        exchangeGenre: genre.genre,
        exchangeDescription: exchangeDesc,
      },
      {
        onSuccess: (data) => {
          console.log("카드가 성공적으로 판매 등록 되었습니다.:", data);
          sellModalClick(); // 수정 후 모달 닫기
        },
        onError: (error) => {
          console.error("카드 판매 등록 중 오류가 발생했습니다.:", error);
        },
      }
    );
  };

  const handleDropdownChange = (option, optionsType) => {
    if (optionsType === "grades") {
      setGrade((prev) => ({
        ...prev,
        ...getParamsByOption(option, optionsType),
      }));
    } else if (optionsType === "genres") {
      setGenre((prev) => ({
        ...prev,
        ...getParamsByOption(option, optionsType),
      }));
    }
  };

  return (
    <div className={styles["container"]}>
      <span className={styles["modify"]}>나의 포토카드 판매하기</span>
      <span className={styles["title"]}>{selectedCard.name}</span>
      <div className={styles["info-container"]}>
        <Image
          src={selectedCard.image}
          width={440}
          height={330}
          className={styles["img"]}
          alt="photocard-image"
        />
        <div className={styles["info"]}>
          <div className={styles["info-top"]}>
            <GradeCategory
              style="medium"
              grade={selectedCard.grade}
              genre={selectedCard.genre}
            />
            <span className={styles["nickname"]}>{selectedCard.nickname}</span>
          </div>
          <div className={styles["edit-container"]}>
            <div className={styles["quantity-container"]}>
              <span className={styles["quantity"]}>총 판매 수량</span>
              <div className={styles["quantity-setting"]}>
                <QuantityButton
                  style={"width-176px"}
                  setNum={setNum}
                  num={num}
                  maxQuantity={selectedCard.quantity}
                />
                <div className={styles["max-container"]}>
                  <span className={styles["max"]}>
                    / {selectedCard.quantity}
                  </span>
                  <span className={styles["max-ko"]}>
                    최대 {selectedCard.quantity}장
                  </span>
                </div>
              </div>
            </div>
            <div className={styles["price-container"]}>
              <span className={styles["price"]}>장당 가격</span>
              <Input
                option={"price"}
                style={"price"}
                placeholder={selectedCard.price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <span className={styles["exchange-info"]}>교환 희망 정보</span>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-position"]}>
          <div className={styles["modal-title"]}>등급</div>
          <Dropdown
            placeholder={"등급"}
            style={"440"}
            options={"grades"}
            onChange={(option) => handleDropdownChange(option, "grades")}
          />
        </div>
        <div className={styles["modal-position"]}>
          <div className={styles["modal-title"]}>장르</div>
          <Dropdown
            placeholder={"장르"}
            style={"440"}
            options={"genres"}
            onChange={(option) => handleDropdownChange(option, "genres")}
          />
        </div>
      </div>
      <div>
        <div className={styles["exchange-request"]}>교환 희망 설명</div>
        <Input
          option={"textarea"}
          style={"textarea-920px"}
          value={exchangeDesc}
          onChange={(e) => setExchangeDesc(e.target.value)}
        />
      </div>
      <div className={styles["buttons"]}>
        <Button
          style={"thin-gray-440px-60px"}
          text={"취소하기"}
          onClick={myGalleryModalClick}
        />
        {/* post 보내기 */}
        <Button
          style={"thin-main-440px-60px"}
          text={"판매하기"}
          onClick={handleSellSubmit}
          disabled={useCreateShopCardMutation.isLoading}
        />
      </div>
    </div>
  );
}
