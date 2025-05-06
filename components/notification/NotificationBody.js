import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./NotificationBody.module.css";
import {
  useCheckNotification,
  useDeleteNotification,
} from "@/lib/reactQuery/useNotifications";

const NotificaionBody = ({ data, setMessageCount, setAlarm, idx, alarm }) => {
  const [time, setTime] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [IsCheck, setIsCheck] = useState("notification-box");
  const usecheckNotificationMutation = useCheckNotification();
  const useDeleteNotificationMutation = useDeleteNotification();

  useEffect(() => {
    const createAt = Math.floor(data.timeDifference / (1000 * 60)); // 1분

    if (createAt < 60) {
      setTime(`${createAt}분 전`);
    } else if (createAt < 60 * 24) {
      setTime(`${Math.floor(createAt / 60)}시간 전`);
    } else if (createAt < 60 * 24 * 7) {
      setTime(`${Math.floor(createAt / (60 * 24))}일 전`);
    } else if (createAt < 60 * 24 * 30) {
      setTime(`${Math.floor(createAt / (30 * 24 * 7))}주 전`);
    } else if (createAt < 60 * 24 * 365) {
      setTime(`${Math.floor(createAt / (60 * 24 * 30))}개월 전`);
    } else {
      setTime(`${Math.floor(createAt / (60 * 24 * 365))}년 전`);
    }

    if (data.check) {
      setIsCheck("notification-box-checked");
    }
  }, [data.timeDifference]);
  const notificationCheckHandler = () => {
    usecheckNotificationMutation.mutate(
      { notificationId: data.id },
      {
        onSuccess: (data) => {
          console.log("확인했습니다.:" + data);
          setIsCheck("notification-box-checked");
          const newAlarm = [...alarm];
          const timeDifference = newAlarm[idx].timeDifference;
          data.timeDifference = timeDifference;
          newAlarm[idx] = data;
          setAlarm(newAlarm);
          if (IsCheck === "notification-box") {
            setMessageCount((prevMessageCount) => prevMessageCount - 1);
          }
        },
        onError: (error) => {
          console.error("오류가 발생했습니다.:", error);
        },
      }
    );
  };

  const notificationDeleteHandler = (event) => {
    event.stopPropagation();
    useDeleteNotificationMutation.mutate(
      { notificationId: data.id },
      {
        onSuccess: (data) => {
          setIsDelete(true);
          console.log("삭제됐습니다.:");
          const newAlarm = [...alarm];
          newAlarm.splice(idx, 1);
          setAlarm(newAlarm);

          if (IsCheck === "notification-box") {
            setMessageCount((prevMessageCount) => prevMessageCount - 1);
          }
        },
        onError: (error) => {
          console.error("오류가 발생했습니다.:", error);
        },
      }
    );
  };
  return (
    <>
      {!isDelete && (
        <div onClick={notificationCheckHandler} className={styles[IsCheck]}>
          <div>{data.message}</div>
          <div className={styles["notification-time"]}>{time}</div>
          <Image
            src="/close-button.svg"
            className={styles["notification-btn"]}
            width={18}
            height={18}
            alt="X"
            onClick={notificationDeleteHandler}
          />
        </div>
      )}
    </>
  );
};

export default NotificaionBody;
