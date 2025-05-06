import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getShopCards,
  getShopCard,
  deleteShopCard,
  createShopCard,
  purchaseShopCard,
  createExchangeRequest,
  updateShopCard,
} from "@/lib/api/shop.js";
import { useErrorStore } from "@/store/useErrorStore";

const { setSuccess, setError } = useErrorStore.getState();

export const useShopCards = (params) => {
  return useQuery({
    queryKey: ["shopCards", params],
    queryFn: () => getShopCards(params),
  });
};

export const useShopCard = (shopId) => {
  return useQuery({
    queryKey: ["shopCard", shopId],
    queryFn: () => getShopCard(shopId),
  });
};

export const useDeleteShopCard = () => {
  return useMutation({
    mutationFn: (shopId) => deleteShopCard(shopId),
    onSuccess: () => {
      setSuccess("삭제되었습니다.", "/mygallery");
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
};

export const useCreateShopCard = () => {
  return useMutation({
    mutationFn: ({
      cardId,
      salesQuantity,
      price,
      exchangeGrade,
      exchangeGenre,
      exchangeDescription,
    }) =>
      createShopCard({
        cardId,
        salesQuantity,
        price,
        exchangeGrade,
        exchangeGenre,
        exchangeDescription,
      }),
    onSuccess: () => {
      setSuccess("판매등록 되었습니다.", "/mygallery");
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
};

export const usePurchaseShopCard = () => {
  return useMutation({
    mutationFn: ({ shopId, purchaseQuantity }) =>
      purchaseShopCard({ shopId, purchaseQuantity }),
    onSuccess: () => {
      setSuccess("구매 되었습니다.", "/mygallery");
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
};

export const useCreateExchangeRequest = () => {
  return useMutation({
    mutationFn: ({ shopId, cardId, description }) =>
      createExchangeRequest({
        shopId,
        cardId,
        description,
      }),
    onSuccess: () => {
      setSuccess("교환신청 되었습니다.", null);
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
};

export const useUpdateShopCard = () => {
  return useMutation({
    mutationFn: ({ shopId, updateData }) =>
      updateShopCard({ shopId, updateData }),
    onSuccess: () => {
      setSuccess("수정되었습니다.", null);
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
};
