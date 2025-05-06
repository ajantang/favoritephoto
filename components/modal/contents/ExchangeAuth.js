import Button from "@/components/buttons/Button";
import styles from "./ExchangeAuth.module.css";
import {
  useAcceptExchange,
  useRefuseExchange,
} from "@/lib/reactQuery/useExchange";

export default function ExchangeAuth({ exchangeAuth, card, isModalClose }) {
  const gradeText =
    card.grade === 0
      ? "COMMON"
      : card.grade === 1
      ? "RARE"
      : card.grade === 2
      ? "SUPER RARE"
      : card.grade === 3
      ? "LEGENDARY"
      : "등급정보없음";

  const genreText =
    card.genre === 0
      ? "풍경"
      : card.genre === 1
      ? "인물"
      : card.genre === 2
      ? "동물"
      : card.genre === 3
      ? "정물"
      : card.genre === 4
      ? "추상"
      : "기타";

  console.log(card.id);
  console.log(exchangeAuth);
  console.log(exchangeAuth === "승인");

  const useAcceptExchangeMutation = useAcceptExchange();
  const useRefuseExchangeMutation = useRefuseExchange();

  const confirmExchangeAuth = () => {
    if (exchangeAuth === "승인") {
      useAcceptExchangeMutation.mutate(card.id);
      
    } else if (exchangeAuth === "거절") {
      useRefuseExchangeMutation.mutate(card.id);
    }
    isModalClose();
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-title"]}>교환 제시 {exchangeAuth}</div>
      <div className={styles["modal-content"]}>
        [{gradeText} | {genreText}] 카드와의 교환을 {exchangeAuth}
        하시겠습니까?
      </div>
      {/* onClick 이벤트 추가해야됨 */}
      {/* if exchangeAuth=거절 -> 교환 제시 delete? */}
      {/* if exchangeAuth=승인 -> 교환 성공? */}
      <Button
        style={"thin-main-170px"}
        text={`${exchangeAuth}하기`}
        onClick={confirmExchangeAuth}
      />
    </div>
  );
}
