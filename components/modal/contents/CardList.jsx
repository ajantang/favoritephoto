import Card from "@/components/cards/Card";
import Dropdown from "@/components/dropdowns/Dropdown";
import Input from "@/components/inputs/Input";
import styles from "@/components/modal/contents/CardList.module.css";

/**
 * @param data
 * @param title
 * @param onClick
 */
export default function CardList({
  data,
  title,
  onClick,
  onChange,
  setParams,
  isLoading,
  onKeyPress,
}) {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["market-place"]}>마이갤러리</div>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["search-dropdown-container"]}>
          <Input
            style={"search-modal"}
            option={"search"}
            placeholder={"검색"}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <div className={styles["dropdown-container"]}>
            <Dropdown
              placeholder={"등급"}
              style={"default"}
              options={"grades"}
              setParams={setParams}
            />
            <Dropdown
              placeholder={"장르"}
              style={"default"}
              options={"genres"}
              setParams={setParams}
            />
          </div>
        </div>
        <div className={styles["card-list"]}>
          {isLoading ? <div>카드를 불러오는 중입니다.</div> : null}
          {data &&
            data.map((card) => (
              <Card
                key={card.id}
                onClick={() => onClick(card)}
                card={card}
                quantity={"quantity"}
              />
            ))}
        </div>
      </div>
    </>
  );
}
