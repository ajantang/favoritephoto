import Image from "next/image";
import styles from "./RandomPoint.module.css";
import pink from "@/public/random-box-pink.png";
import purple from "@/public/random-box-purple.png";
import blue from "@/public/random-box-blue.png";
import {
  useAddRandomPoint,
  useGetLastAddTime,
} from "@/lib/reactQuery/usePoint";
import { useEffect, useState } from "react";
import useTimerStore from "@/store/useTimerStore";
import useAuthStore from "@/store/useAuthStore";

export default function RandomPoint() {
  const { data, isLoading } = useGetLastAddTime();
  const [remainingTime, setRemainingTime] = useState(0);

  const { handlePointModal, resetTimeout } = useTimerStore();
  const { updatePoints } = useAuthStore();

  const useAddRandomPointMutation = useAddRandomPoint();

  useEffect(() => {
    if (!data) return;

    const lastGetPointTime = data.data.timeDifference;
    console.log(lastGetPointTime);

    setRemainingTime(Math.max(180000 - lastGetPointTime, 0)); // 3분 남은 시간
    // setRemainingTime(Math.max(3600000 - timeDifference, 0));  // 1시간 남은 시간

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        // 음수가 되는 걸 방지
        if (prevTime <= 999) {
          clearInterval(interval); // 시간이 0 이하일 경우 타이머 멈춤
          return 0;
        }
        return prevTime - 1000; // 1초마다 1000ms씩 감소
      });
    }, 1000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, [data]);

  // 랜덤 포인트 획득
  const handleGetPoint = () => {
    useAddRandomPointMutation.mutate(null, {
      onSuccess: (data) => {
        if (data.data.success) {
          console.log("랜덤 포인트 추가 성공: ", data);
          console.log("획득 포인트: ", data.data.earnedPoint);
          console.log("내 포인트: ", data.data.point);
          console.log("남은 시간 : ", remainingTime);
          handlePointModal();

          updatePoints(data.data.point);

          resetTimeout();
        } else {
          console.log("획득 포인트: ", data.data.earnedPoint);
          console.log("내 포인트: ", data.data.point);
          console.log("랜덤 포인트 지급 시간이 아닙니다...");
          console.log("남은 시간 : ", remainingTime);
        }
      },
      onError: (error) => {
        console.log("랜덤 포인트 추가 실패: ", error);
      },
    });
  };

  // 분과 초로 변환하는 함수
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}분 ${seconds}초`;
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["text-container"]}>
        <div className={styles["title"]}>
          랜덤<span className={styles["title-point"]}>포인트</span>
        </div>
        <div className={styles["content"]}>
          1시간마다 돌아오는 기회! <br />
          랜덤 상자 뽑기를 통해 포인트를 획득하세요!
        </div>
        <div className={styles["time-container"]}>
          <span className={styles["next-time-text"]}>
            다음 기회까지 남은 시간
          </span>
          <span className={styles["time"]}>
            {remainingTime ? formatTime(remainingTime) : "00분 00초"}
          </span>
        </div>
      </div>
      <div className={styles["box-container"]}>
        <Image
          src={blue}
          className={styles["box"]}
          onClick={handleGetPoint}
          alt="blue-box"
        />
        <Image
          src={purple}
          className={styles["box"]}
          onClick={handleGetPoint}
          alt="purple-box"
        />
        <Image
          src={pink}
          className={styles["box"]}
          onClick={handleGetPoint}
          alt="pink-box"
        />
      </div>
    </div>
  );
}
