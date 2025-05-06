import { useMutation } from "@tanstack/react-query";
import { postSignin, postSignout, postSignup } from "../api/auth";
import useAuthStore from "@/store/useAuthStore";
import { useErrorStore } from "@/store/useErrorStore";

const { login, logout } = useAuthStore.getState();
const { setSuccess, setError } = useErrorStore.getState();

export function usePostSignin() {
  return useMutation({
    mutationFn: ({ email, password }) => postSignin({ email, password }),
    onSuccess: (data) => {
      login(data);
      setSuccess("로그인 되었습니다.", "/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function usePostSignup() {
  return useMutation({
    mutationFn: ({ email, password, nickname }) =>
      postSignup({ email, password, nickname }),
    onSuccess: () => {
      setSuccess("회원가입 되었습니다.", "/auth/signin");
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}

export function usePostSignout() {
  return useMutation({
    mutationFn: () => postSignout(),
    onSuccess: () => {
      logout();
      setSuccess("로그아웃 되었습니다.", "/");
    },
    onError: (error) => {
      setError(error.response.data.message, null);
    },
  });
}
