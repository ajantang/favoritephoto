import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMyNotification,
  checkNotification,
  deleteNotification,
} from "../api/notification";
import { useErrorStore } from "@/store/useErrorStore";

const { setError } = useErrorStore.getState();

export const useGetMyNotificationQuery = (params) => {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => getMyNotification(params),
    keepPreviousData: true,
  });
};

export const useCheckNotification = () => {
  return useMutation({
    mutationFn: ({ notificationId }) => checkNotification({ notificationId }),
    onSuccess: () => {},
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
};

export function useDeleteNotification() {
  return useMutation({
    mutationFn: ({ notificationId }) => deleteNotification({ notificationId }),
    onSuccess: () => {},
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}
