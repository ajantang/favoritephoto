import { useMutation } from "@tanstack/react-query";
import {
  acceptExchange,
  deleteExchange,
  refuseExchange,
} from "../api/exchange";
import { useErrorStore } from "@/store/useErrorStore";

const { setSuccess, setError } = useErrorStore.getState();

// 포토카드 교환 승인
export function useAcceptExchange() {
  return useMutation({
    mutationFn: (exchangedId) => acceptExchange({ exchangedId }),
    onSuccess: () => {
      setSuccess("교환승인 되었습니다.", null);
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}

// 포토카드 교환 거절
export function useRefuseExchange() {
  return useMutation({
    mutationFn: (exchangedId) => refuseExchange({ exchangedId }),
    onSuccess: () => {
      setSuccess("교환거절 되었습니다.", null);
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}

// 포토카드 교환 삭제
export function useDeleteExchange() {
  return useMutation({
    mutationFn: ({ exchangedId }) => deleteExchange({ exchangedId }),
    onSuccess: () => {
      setSuccess("교환취소 되었습니다.", null);
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}
