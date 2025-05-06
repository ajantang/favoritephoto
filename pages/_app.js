<<<<<<< HEAD
=======
import DefaultContent from "@/components/modal/contents/DefaultContent";
import ModalContainer from "@/components/modal/ModalContainer";
import RandomPoint from "@/components/modal/contents/RandomPoint";
import Nav from "@/components/nav/Nav";
import { useErrorStore } from "@/store/useErrorStore";
import useTimerStore from "@/store/useTimerStore";
>>>>>>> develop
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const {
    error,
    setError,
    signinError,
    setSigninError,
    success,
    setSuccess,
    redirectPath,
  } = useErrorStore();
  const router = useRouter();

  const { pointModal, handlePointModal } = useTimerStore();

  const handleClick = () => {
    setSigninError(null);
    if (!redirectPath) {
      window.location.reload();
    } else if (redirectPath === "back") {
      router.back();
    } else if (redirectPath) {
      router.push(redirectPath);
    }
    setError(null);
    setSuccess(null);
  };

  return (
<<<<<<< HEAD
    <>
      <Component {...pageProps} />;
    </>
=======
    <QueryClientProvider client={queryClient}>
      <Nav handlePointModal={handlePointModal} />
      <Component {...pageProps} />
      {pointModal && (
        <ModalContainer onClick={handlePointModal}>
          <RandomPoint handlePointModal={handlePointModal} />
        </ModalContainer>
      )}
      {(error || success) && (
        <ModalContainer onClick={handleClick}>
          <DefaultContent
            style={"default"}
            title={signinError}
            content={error || success}
            buttonContent={"확인"}
            buttonStyle={"thin-main-170px"}
            onClick={handleClick}
          />
        </ModalContainer>
      )}
    </QueryClientProvider>
>>>>>>> develop
  );
}
