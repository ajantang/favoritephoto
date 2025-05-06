import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUsersExchange,
  getUsersMyCardList,
  getUsersMyCards,
  getUsersShop,
  postUsersMyCards,
} from "../api/users";
import { QUERY_KEYS } from "../constant/queryKeys";
import { useErrorStore } from "@/store/useErrorStore";

const { setSuccess, setError } = useErrorStore.getState();

/**
 * - **카드상세 조회**
 * - queryFn: () => getUsersMyCards({ id }),
 * @param id : 카드 id
 */
export function useUsersMyCardsQuery({ id }) {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS_MY_CARDS, id],
    queryFn: () => getUsersMyCards({ id }),
    keepPreviousData: true,
    enabled: !!id,
    retry: false,
  });
}

/**
 * - **보유한 카드목록**
 *@param sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
  @param genre : 장르 (필터 / int로 전달)
  @param sellout : true || false매진 여부 (필터) - 삭제 예
  @param grade : 등급 (필터 / int로 전달)
  @param ownerId : 판매자 ID(필터)
  @param pageNum : 페이지 넘버(페이지네이션)
  @param pageSize : 페이지 사이즈(페이지네이션)
  @param keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색
 */

export function useUsersMyCardListQuery({
  sort,
  genre,
  sellout,
  grade,
  ownerId,
  pageNum,
  pageSize,
  keyword,
  user,
}) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.USERS_MY_CARD_LIST,
      sort,
      genre,
      sellout,
      grade,
      ownerId,
      pageNum,
      pageSize,
      keyword || "",
    ],
    queryFn: () =>
      getUsersMyCardList({
        sort,
        genre,
        sellout,
        grade,
        ownerId,
        pageNum,
        pageSize,
        keyword,
      }),
    enabled: !!user, // user가 존재할 때만 쿼리 실행
    keepPreviousData: true,
  });
}

/**
 * - **내 소유 포토 카드 판매 등록**
 * - mutationFn: ({ name, description, image, grade, genre, price, quantity }) =>
      postUsersMyCards({
        name,
        description,
        image,
        grade,
        genre,
        price,
        quantity,
      }),
  @param name : 카드 이름 (max-length 50)
  @param description : 카드 설명 (max-length 1024)
  @param image : 카드 이미지 url (max-length : 2048)
  @param grade : 카드 등급 (int로 전달)
  @param genre : 카드 장르 (int로 전달)
  @param quantity : 카드 생성 갯수
  @param price : 카드 가격(초기 포인트 : 판매 포인트와 별도. 교환 신청에서 사용됨)
 */
export function usePostUsersMyCardsMutation() {
  return useMutation({
    mutationFn: ({ name, description, image, grade, genre, price, quantity }) =>
      postUsersMyCards({
        name,
        description,
        image,
        grade,
        genre,
        price,
        quantity,
      }),
    onSuccess: () => {
      setSuccess("생성되었습니다.", "/mygallery");
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}

/**
 * - **내가 상점에 등록한 포토 카드 목록 조회**
@param sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
@param genre : 장르 (필터 / int로 전달)
@param sellout : true || false매진 여부 (필터) - 삭제 예
@param grade : 등급 (필터 / int로 전달)
@param ownerId : 판매자 ID(필터)
@param pageNum : 페이지 넘버(페이지네이션)
@param pageSize : 페이지 사이즈(페이지네이션)
@param keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색
@param hasExchangeRequest : 해당 상점에 교환 신청 여부
 */
export function useUsersShopQuery({
  sort,
  genre,
  sellout,
  grade,
  ownerId,
  pageNum,
  pageSize,
  keyword,
  hasExchangeRequest,
}) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.USERS_MY_CARDS_SHOP,
      sort,
      genre,
      sellout,
      grade,
      ownerId,
      pageNum,
      pageSize,
      keyword,
      hasExchangeRequest,
    ],
    queryFn: () =>
      getUsersShop({
        sort,
        genre,
        sellout,
        grade,
        ownerId,
        pageNum,
        pageSize,
        keyword,
        hasExchangeRequest,
      }),
    keepPreviousData: true,
  });
}

/**
@param sort : recent || oldest || cheapest || highest (최신순 OR 오래된 순 OR 가격 낮은 순 OR 가격 높은 순 정렬)
@param genre : 장르 (필터 / int로 전달)
@param sellout : true || false매진 여부 (필터) - 삭제 예
@param grade : 등급 (필터 / int로 전달)
@param ownerId : 판매자 ID(필터)
@param pageNum : 페이지 넘버(페이지네이션)
@param pageSize : 페이지 사이즈(페이지네이션)
@param keyword : 판매 포토 카드의 이름(name), 설명(description) 중 포함 단어 여부로 검색
 */
export function useUsersExchangeQuery({
  sort,
  genre,
  sellout,
  grade,
  ownerId,
  pageNum,
  pageSize,
  keyword,
}) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.USERS_MY_CARDS_EXCHANGE,
      sort,
      genre,
      sellout,
      grade,
      ownerId,
      pageNum,
      pageSize,
      keyword,
    ],
    queryFn: () =>
      getUsersExchange({
        sort,
        genre,
        sellout,
        grade,
        ownerId,
        pageNum,
        pageSize,
        keyword,
      }),
    keepPreviousData: true,
  });
}
