import Image from "next/image";
import styles from "./EditExchangeInfo.module.css";
import editIcon from "@/public/edit-icon.svg";
import GradeCategory from "./info/GradeCategory";
import Button from "../buttons/Button";
import ModalContainer from "../modal/ModalContainer";
import DefaultContent from "../modal/contents/DefaultContent";
import { useDeleteShopCard } from "@/lib/reactQuery/useShop";
import { useState } from "react";

export default function EditExchangeInfo({
  editModalClick,
  exchangeInfo,
  card,
}) {
  const [deleteModal, setDeleteModal] = useState(false);

  console.log(deleteModal);

  const useDeleteShopCardMutation = useDeleteShopCard();

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  console.log(card);
  console.log(card.id);

  const deleteShopCard = () => {
    useDeleteShopCardMutation.mutate(card.id);
  };

  console.log(exchangeInfo);
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["title"]}>
          <Image src={editIcon} alt="edit-icon" />
          교환 희망 정보
        </div>
        <GradeCategory
          style={"medium"}
          grade={exchangeInfo.grade}
          genre={exchangeInfo.genre}
        />
        <div className={styles["content"]}>{exchangeInfo.description}</div>
        <div className={styles["button-container"]}>
          <Button
            text={"수정하기"}
            style={"thick-main-440px"}
            onClick={editModalClick}
          />
          <Button
            text={"판매 내리기"}
            style={"thick-black-440px-80px"}
            onClick={handleDeleteModal}
          />
        </div>
      </div>
      {deleteModal && (
        <ModalContainer onClick={handleDeleteModal}>
          <DefaultContent
            style={"default"}
            title={"포토카드 판매 내리기"}
            content={"정말로 판매를 중단시키겠습니까?"}
            buttonContent={"판매 내리기"}
            onClick={deleteShopCard}
          />
        </ModalContainer>
      )}
    </>
  );
}
