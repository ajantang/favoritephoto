import { useState, useEffect, useRef } from "react";
import { useUsersShopQuery } from "@/lib/reactQuery/useUsers.js";
import styles from "@/styles/Mygallery.module.css";
import Dropdown from "@/components/dropdowns/Dropdown";
import Input from "@/components/inputs/Input";
import Card from "@/components/cards/Card";
import classNames from "classnames";
import useAuthStore from "@/store/useAuthStore";
import Loading from "@/components/loading/Loading";
import Link from "next/link";

export default function Mysales() {
  const { user } = useAuthStore();
  const [inputValue, setInputValue] = useState();
  const [params, setParams] = useState({
    sort: "recent",
    genre: "",
    sellout: false,
    grade: "",
    pageNum: 1,
    pageSize: 9,
    keyword: "",
    hasExchangeRequest: "",
  });
  const [cards, setCards] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const observerTarget = useRef(null);

  const { data, isLoading } = useUsersShopQuery(params);

  useEffect(() => {
    if (data) {
      setCards(data.data.shops);
      setHasNextPage(data.data.shops.length >= params.pageSize);
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
          <div className={styles["mygallery-title"]}>나의 판매 포토카드</div>
        </div>
        <div className={styles["mygallery-grade-box-wrapper"]}>
          <p className={styles["mygallery-grade-box-title"]}>
            님이 보유한 포토카드
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
          <Input style={"search"} option={"search"} placeholder={"검색"} />
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
            <Dropdown
              placeholder={"판매방법"}
              style={"default"}
              options={"saleMethods"}
              setParams={setParams}
            />
            <Dropdown
              placeholder={"매진여부"}
              style={"default"}
              options={"sales"}
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
          <div className={styles["mygallery-title"]}>나의 판매 포토카드</div>
        </div>
        <div className={styles["mygallery-grade-box-wrapper"]}>
          <p className={styles["mygallery-grade-box-title"]}>
            {user && user.data.nickname}님이 보유한 포토카드
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
              {data && data.data.countsGroupByGrade && (
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
              {data && data.data.countsGroupByGrade && (
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
              {data && data.data.countsGroupByGrade && (
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
              {data && data.data.countsGroupByGrade && (
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
            option={"search"}
            placeholder={"검색"}
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
            <Dropdown
              placeholder={"판매방법"}
              style={"default"}
              options={"saleMethods"}
              setParams={setParams}
            />
            <Dropdown
              placeholder={"매진여부"}
              style={"default"}
              options={"sales"}
              setParams={setParams}
            />
          </div>
        </div>
      </div>
      {cards && (
        <div className={styles["mygallery-main-card-grid"]}>
          {cards.map((card, index) => (
            <Link key={card.id} href={`/seller/photocard/${card.id}`}>
              <Card key={index} card={card} />
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
