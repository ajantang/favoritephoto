import Image from "next/image";
import styles from "./Loggedin.module.css";
import alarm from "@/public/alarm-icon.svg";
import UserDrop from "./UserDrop";
import Notification from "../notification/Notification";
import useTimerStore from "@/store/useTimerStore";

export default function Loggedin({
  logout,
  onClick,
  userDrop,
  setUserDrop,
  nickname,
  point,
}) {
  const { handlePointModal } = useTimerStore();

  const handleNicknameClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["random-point"]} onClick={handlePointModal}>🎁</div>
      <span className={styles["points"]}>
        {point.toLocaleString("ko-KR")} P
      </span>
      <Notification />
      <div className={styles["nickname-container"]}>
        <span className={styles["nickname"]} onClick={handleNicknameClick}>
          {nickname}
        </span>
        <div className={styles["user-drop"]}>
          {userDrop && (
            <UserDrop
              nickname={nickname}
              point={point}
              setUserDrop={setUserDrop}
              logout={logout}
              handlePointModal={handlePointModal}
            />
          )}
        </div>
      </div>
      <div className={styles["line"]}>|</div>
      <span className={styles["logout"]} onClick={logout}>
        로그아웃
      </span>
    </div>
  );
}
