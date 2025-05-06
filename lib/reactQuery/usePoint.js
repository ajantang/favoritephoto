import { useMutation, useQuery } from "@tanstack/react-query";
import { addRandomPoint, getLastAddTime } from "../api/point";
import { QUERY_KEYS } from "../constant/queryKeys";
import { useErrorStore } from "@/store/useErrorStore";

const { setError } = useErrorStore.getState();

// 랜덤 포인트(1~3) 추가 POST
export function useAddRandomPoint() {
  return useMutation({
    mutationFn: () => addRandomPoint(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}

// 마지막으로 호출한 랜덤 포인트 추가 API 시간 차이 확인 GET
export function useGetLastAddTime() {
  return useQuery({
    queryKey: [QUERY_KEYS.POINTS_LAST_BOX_TIME_GAP],
    queryFn: () => getLastAddTime(),
    keepPreviousData: true,
  });
}
