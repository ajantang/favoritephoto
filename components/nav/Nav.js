import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import mainLogo from "@/public/logo.svg";
import listIcon from "@/public/nav-list.svg";
import styles from "./Nav.module.css";
import Loggedin from "./Loggedin";
import NonLogin from "./NonLogin";
import useAuthStore from "@/store/useAuthStore";
import { usePostSignout } from "@/lib/reactQuery/useAuth";

export default function Nav() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [userDrop, setUserDrop] = useState(false);

  const usePostSignoutMutation = usePostSignout();

  const handleUserDrop = () => {
    setUserDrop((prevState) => !prevState); // 이전 상태에 따라 토글
  };

  const handleMobileUserDrop = (e) => {
    e.stopPropagation();
    setUserDrop((prevState) => !prevState); // 이전 상태에 따라 토글
  };

  const handleSignout = () => {
    usePostSignoutMutation.mutate();
  };

  return (
    // 로그인과 회원가입 부분에 Nav가 안보이게 하기 위해
    // pathname을 이용하여 다른 style이 적용되게 했습니다.
    <div>
      <header
        className={`${styles["nav"]} ${
          router.pathname === "/auth/signin" ||
          router.pathname === "/auth/signup"
            ? styles["nav-none"]
            : ""
        }`}
      >
        <div className={styles["container"]}>
          <div className={styles["list"]} onClick={handleMobileUserDrop}>
            <Image src={listIcon} alt="list-icon" />
          </div>
          <Link href="/">
            <Image src={mainLogo} className={styles["logo"]} alt="logo" />
          </Link>
          {user ? (
            <>
              <Loggedin
                nickname={user.data.nickname}
                point={user.data.point}
                onClick={handleUserDrop}
                logout={handleSignout}
                userDrop={userDrop}
                setUserDrop={setUserDrop}
              />
            </>
          ) : (
            <NonLogin userDrop={userDrop} setUserDrop={setUserDrop} />
          )}
        </div>
      </header>
    </div>
  );
}
