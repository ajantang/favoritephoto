import Link from "next/link";
import styles from "./NonLogin.module.css";
import UserDrop from "./UserDrop";

export default function NonLogin({ userDrop, setUserDrop }) {
  return (
    <div className={styles["container"]}>
      <Link href={"/auth/signin"}>
        <span className={styles["login"]}>
          로그인
        </span>
      </Link>
      <Link href={"/auth/signup"}>
        <div className={styles["signup"]}>회원가입</div>
      </Link>
      <div className={styles["user-drop"]}>
        {userDrop && <UserDrop setUserDrop={setUserDrop} />}
      </div>
    </div>
  );
}
