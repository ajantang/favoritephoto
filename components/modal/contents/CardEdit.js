import Image from "next/image";
import styles from "./CardEdit.module.css";
import defaultImg from "@/public/default-test-img.svg";
import GradeCategory from "@/components/cards/info/GradeCategory";
import QuantityButton from "@/components/buttons/QuantityButton";
import Input from "@/components/inputs/Input";
import Dropdown from "@/components/dropdowns/Dropdown";
import Button from "@/components/buttons/Button";
import { useState } from "react";
import { useUpdateShopCard } from "@/lib/reactQuery/useShop";
import { getParamsByOption } from "@/hooks/useGetIndex/useGetIndex";

export default function CardEdit({ editModalClick, card, exchangeInfo }) {
  const [num, setNum] = useState(card.totalQuantity);
  const [price, setPrice] = useState(card.price);
  const [grade, setGrade] = useState(card.grade);
  const [genre, setGenre] = useState(card.genre);
  const [exchangeDesc, setExchangeDesc] = useState("");

  // useUpdateShopCard 훅을 사용하여 API 호출
  const useUpdateShopCardMutation = useUpdateShopCard();

  const updateData = {
    salesQuantity: num,
    price: Number(price),
    exchangeGrade: grade.grade,
    exchangeGenre: genre.genre,
    exchangeDescription: exchangeDesc,
  };
  // 수정하기 버튼 클릭 시 호출될 함수
  const handleSubmit = () => {
    useUpdateShopCardMutation.mutate(
      { shopId: card.id, updateData },
      {
        onSuccess: (data) => {
          console.log("카드 정보가 성공적으로 업데이트 되었습니다.:", data);
          editModalClick(); // 수정 후 모달 닫기
        },
        onError: (error) => {
          console.error("카드 정보 업데이트 중 오류가 발생했습니다.:", error);
        },
      }
    );
  };
  console.log(updateData);

  // const handleDropdownChange = (option, optionsType) => {
  //   if (optionsType === "grades") {
  //     setGrade((prev) => ({
  //       ...prev,
  //       ...getParamsByOption(option, optionsType),
  //     }));
  //   } else if (optionsType === "genres") {
  //     setGenre((prev) => ({
  //       ...prev,
  //       ...getParamsByOption(option, optionsType),
  //     }));
  //   }
  // };

  const handleGradeChange = (option, optionsType) => {
    setGrade((prev) => ({
      ...prev,
      ...getParamsByOption(option, optionsType),
    }));
  };

  const handleGenreChange = (option, optionsType) => {
    setGenre((prev) => ({
      ...prev,
      ...getParamsByOption(option, optionsType),
    }));
  };

  // console.log(shop);
  // console.log(card);
  // console.log(num);
  // console.log("price 값은 :", price);
  // console.log(typeof price);
  // console.log(grade);
  // console.log(genre);
  // console.log(exchangeDesc);

  return (
    <div className={styles["container"]}>
      <span className={styles["modify"]}>수정하기</span>
      <span className={styles["title"]}>{card.name}</span>
      <div className={styles["info-container"]}>
        <Image
          src={card.image}
          width={440}
          height={330}
          className={styles["img"]}
          alt="photocard-image"
        />
        <div className={styles["info"]}>
          <div className={styles["info-top"]}>
            <GradeCategory
              style="medium"
              grade={card.grade}
              genre={card.genre}
            />
            <span className={styles["nickname"]}>{card.creatorNickname}</span>
          </div>
          <div className={styles["edit-container"]}>
            <div className={styles["quantity-container"]}>
              <span className={styles["quantity"]}>총 판매 수량</span>
              <div className={styles["quantity-setting"]}>
                <QuantityButton
                  style={"width-176px"}
                  setNum={setNum}
                  num={num}
                  maxQuantity={card.totalQuantity}
                />
                <div className={styles["max-container"]}>
                  <span className={styles["max"]}>/ {card.totalQuantity} </span>
                  <span className={styles["max-ko"]}>
                    최대 {card.totalQuantity}장
                  </span>
                </div>
              </div>
            </div>
            <div className={styles["price-container"]}>
              <span className={styles["price"]}>장당 가격</span>
              <Input
                option={"price"}
                style={"price"}
                placeholder={card.price}
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
            onChange={(option) => handleGradeChange(option, "grades")}
          />
        </div>
        <div className={styles["modal-position"]}>
          <div className={styles["modal-title"]}>장르</div>
          <Dropdown
            placeholder={"장르"}
            style={"440"}
            options={"genres"}
            onChange={(option) => handleGenreChange(option, "genres")}
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
          onClick={editModalClick}
        />
        {/* patch 보내기 */}
        <Button
          style={"thin-main-440px-60px"}
          text={"수정하기"}
          onClick={handleSubmit}
          disabled={useUpdateShopCardMutation.isLoading} // 요청 중이면 버튼 비활성화
        />
      </div>
    </div>
  );
}
