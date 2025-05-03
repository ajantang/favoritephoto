import axios from "axios";
import { useErrorStore } from "@/store/useErrorStore";

export default function renderApi(cookies = "") {
  const isServer = typeof window === "undefined";
  const { setError, setSigninError } = useErrorStore.getState();

  const api = axios.create({
    baseURL: "https://favoritephoto.vercel.app/api",
    headers: {
      "Content-Type": "application/json",
      ...(isServer ? { Cookie: cookies } : {}),
    },
    withCredentials: !isServer,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (!isServer) {
          setSigninError("로그인이 필요합니다.");
          setError(
            "로그인 하시겠습니까? \n 다양한 서비스를 편리하게 이용하실 수 있습니다.",
            "/auth/signin"
          );
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
