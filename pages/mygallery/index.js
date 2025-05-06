import { useState, useEffect, useRef } from "react";
import { useUsersMyCardListQuery } from "@/lib/reactQuery/useUsers";
import styles from "@/styles/Mygallery.module.css";
import Button from "@/components/buttons/Button";
import Dropdown from "@/components/dropdowns/Dropdown";
import Input from "@/components/inputs/Input";
import Card from "@/components/cards/Card";
import classNames from "classnames";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import Loading from "@/components/loading/Loading";

export default function Mygallery() {
  const { user } = useAuthStore();
  const [inputValue, setInputValue] = useState("");
  const [params, setParams] = useState({
    genre: "",
    grade: "",
    pageNum: 1,
    pageSize: 9,
    keyword: "",
  });
  const [cards, setCards] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const observerTarget = useRef(null);

  const { data, isLoading, error } = useUsersMyCardListQuery({
    ...params,
    user,
  });

  useEffect(() => {
    if (data) {
      setCards(data.data.cards);
      setHasNextPage(data.data.cards.length >= params.pageSize);
    }
  }, [data]);

  const loadMoreCards = () => {
    if (!isLoading && hasNextPage) {
      setParams((prevParams) => ({
        ...prevParams,
        pageSize: prevParams.pageSize + 6,
      }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCards();
        }
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [loadMoreCards]);

  if (isLoading && !cards)
    return (
      <div className={styles["mygallery-nav-wrapper"]}>
        <div className={styles["mygallery-nav"]}>
          <div className={styles["mygallery-title"]}>마이갤러리</div>
          <Link href="/mygallery/createcard">
            <Button text={"포토카드 생성하기"} style={"thin-main-440px-60px"} />
          </Link>
        </div>
        <div className={styles["mygallery-grade-box-wrapper"]}>
          <p className={styles["mygallery-grade-box-title"]}>
            <span className={styles["loading-skeleton"]}></span>님이 보유한
            포토카드
            <span className={styles["mygallery-grade-box-count"]}></span>
          </p>
          <div className={styles["mygallery-grade-box-container"]}>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["common"]
              )}
            >
              COMMON
              <span className={styles["mygallery-grade-box-text"]}>장</span>
            </div>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["rare"]
              )}
            >
              RARE
              <span className={styles["mygallery-grade-box-text"]}>장</span>
            </div>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["super-rare"]
              )}
            >
              SUPER RARE
              <span className={styles["mygallery-grade-box-text"]}>장</span>
            </div>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["legendary"]
              )}
            >
              LEGENDARY
              <span className={styles["mygallery-grade-box-text"]}>장</span>
            </div>
          </div>
        </div>
        <div className={styles["mygallery-main-container-nav"]}>
          <Input style={"search"} placeholder={"검색"} option={"search"} />
          <div className={styles["mygallery-main-container-dropdowns"]}>
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
        {!cards && (
          <div className={styles["loading-container"]}>
            <Loading />
          </div>
        )}
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setParams(() => ({
        keyword: inputValue,
        pageNum: 1,
      }));
    }
  };

  const handleClick = (e) => {
    setParams(() => ({
      keyword: inputValue,
      pageNum: 1,
    }));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={styles["mygallery-nav-wrapper"]}>
        <div className={styles["mygallery-nav"]}>
          <div className={styles["mygallery-title"]}>마이갤러리</div>
          <Link href="/mygallery/createcard">
            <Button text={"포토카드 생성하기"} style={"thin-main-440px-60px"} />
          </Link>
        </div>
        <div className={styles["mygallery-grade-box-wrapper"]}>
          <p className={styles["mygallery-grade-box-title"]}>
            {user?.data.nickname}님이 보유한 포토카드
            {data && (
              <span className={styles["mygallery-grade-box-count"]}>
                ({data.data.totalCount})
              </span>
            )}
          </p>
          <div className={styles["mygallery-grade-box-container"]}>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["common"]
              )}
            >
              COMMON
              {data && (
                <span className={styles["mygallery-grade-box-text"]}>
                  {!data.data.countsGroupByGrade[0]
                    ? 0
                    : data.data.countsGroupByGrade[0]}
                  장
                </span>
              )}
            </div>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["rare"]
              )}
            >
              RARE
              {data && (
                <span className={styles["mygallery-grade-box-text"]}>
                  {!data.data.countsGroupByGrade[1]
                    ? 0
                    : data.data.countsGroupByGrade[1]}
                  장
                </span>
              )}
            </div>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["super-rare"]
              )}
            >
              SUPER RARE
              {data && (
                <span className={styles["mygallery-grade-box-text"]}>
                  {!data.data.countsGroupByGrade[2]
                    ? 0
                    : data.data.countsGroupByGrade[2]}
                  장
                </span>
              )}
            </div>
            <div
              className={classNames(
                styles["mygallery-grade-box"],
                styles["legendary"]
              )}
            >
              LEGENDARY
              {data && (
                <span className={styles["mygallery-grade-box-text"]}>
                  {!data.data.countsGroupByGrade[3]
                    ? 0
                    : data.data.countsGroupByGrade[3]}
                  장
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles["mygallery-main-container-nav"]}>
          <Input
            style={"search"}
            placeholder={"검색"}
            option={"search"}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            onChange={handleInputChange}
          />
          <div className={styles["mygallery-main-container-dropdowns"]}>
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
      </div>
      {cards && (
        <div className={styles["mygallery-main-card-grid"]}>
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/mygallery/${card.id}`}
              className={styles["mygallery-main-card-grid-item"]}
            >
              <Card card={card} quantity={"quantity"} />
            </Link>
          ))}
        </div>
      )}
      {hasNextPage && (
        <div
          ref={observerTarget}
          className={styles["scroll-loading-container"]}
        >
          <Loading />
        </div>
      )}
    </>
  );
}
