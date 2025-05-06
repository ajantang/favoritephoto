import styles from "@/components/dropdowns/Dropdown.module.css";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  optionArray,
  getParamsByOption,
} from "@/hooks/useGetIndex/useGetIndex";

/**
 * @param options
 * 1. "grades" : ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"]
 * 2. "genres" : ["풍경", "인물", "동물", "정물", "추상", "기타"]
 * 3. "sales" : ["판매 중", "판매 완료"]
 * 4. "sortOptions" : ["최신 순", "오래된 순", "높은 가격순", "낮은 가격순"]
 * @param placeholder - "placeholder" : default text
 * @param style
 * 1. "default" : 홈페이지 pc (등급 장르 매진여부)
 * 2. "180" : 홈페이지 pc (낮은 가격순)
 * 3. "440" : 나의 포토카드 판매하기 pc (등급 장르)
 * 4. "520" : 포토카드 생성 pc (등급 장르)
 * @param setParams - setParams : requset params (optional)
 */

export default function Dropdown({
  options,
  placeholder,
  style,
  setParams,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (setParams) {
      setParams((prevParams) => ({
        ...prevParams,
        ...getParamsByOption(option, options),
      }));
    }
    if (onChange) {
      onChange(option);
    }
  };

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const containerClass = `${styles[`dropdown-container-${style}`]}`;
  const menuClass = `${styles[`dropdown-menu-${style}`]}`;
  const itemClass = `${styles[`dropdown-menu-item-${style}`]}`;

  const handleFontWeight = () => {
    if (!selectedOption && placeholder.includes("선택")) {
      return 300;
    }
  };

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <div className={containerClass} onClick={toggleDropdown}>
        <span
          style={{
            color:
              !selectedOption && placeholder.includes("선택")
                ? "var(--gray-200)"
                : "var(--white)",
            fontWeight: handleFontWeight(),
          }}
        >
          {selectedOption ? selectedOption : placeholder}
        </span>
        <Image
          src="/down-icon.svg"
          width={24}
          height={24}
          className={styles["dropdown-btn"]}
          alt="dropdown-btn"
        />
      </div>
      {isOpen && (
        <div className={menuClass}>
          {optionArray[options].map((option, index) => (
            <div
              key={index}
              className={itemClass}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
