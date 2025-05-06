import { useRef, useState, useEffect } from "react";
import NotificationBody from "./NotificationBody.js";
import styles from "./Notification.module.css";
import { useGetMyNotificationQuery } from "@/lib/reactQuery/useNotifications.js";
import Image from "next/image.js";

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [alarm, setAlarm] = useState([]);
  const [params, setParams] = useState({
    pageSize: "100",
    pageNum: "1",
  });
  const dropdownRef = useRef(null);
  const { data } = useGetMyNotificationQuery(params);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (data) {
      setAlarm(data.notifications);
      const getMessageCount = data.notifications.filter(
        (notification) => !notification.check
      ).length;
      setMessageCount(getMessageCount);
    }
  }, [data]);
  return (
    <div className={styles["notification"]} ref={dropdownRef}>
      <div className={styles["icon-container"]}>
        <Image
          src="/alarm-icon.svg"
          width={24}
          height={24}
          className={styles["alarm"]}
          alt="alarm"
          onClick={toggleDropdown}
        />
        {messageCount !== 0 ? (
          <div className={styles["alarm-indicator"]}>
            {messageCount > 99 ? "99+" : messageCount}
          </div>
        ) : null}
      </div>
      {isOpen && (
        <div className={styles["notification-container"]}>
          {alarm &&
            alarm.map((notification, idx) => (
              <NotificationBody
                data={notification}
                key={notification.id}
                setMessageCount={setMessageCount}
                setAlarm={setAlarm}
                idx={idx}
                alarm={alarm}
              />
            ))}
        </div>
      )}
    </div>
  );
}
