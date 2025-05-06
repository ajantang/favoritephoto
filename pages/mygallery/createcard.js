import styles from "@/styles/Createcard.module.css";
import Input from "@/components/inputs/Input";
import Dropdown from "@/components/dropdowns/Dropdown";
import Button from "@/components/buttons/Button";
import { useState } from "react";
import { getParamsByOption } from "@/hooks/useGetIndex/useGetIndex";
import { getImageUrl } from "@/lib/api/image";
import { usePostUsersMyCardsMutation } from "@/lib/reactQuery/useUsers";
import { useRouter } from "next/router";

export default function Createcard() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [value, setValue] = useState({
    name: "",
    description: "",
    image: "",
    grade: "",
    genre: "",
    price: "",
    quantity: "",
  });

  const handleDropdownChange = (option, optionsType) => {
    setValue((prev) => ({
      ...prev,
      ...getParamsByOption(option, optionsType),
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadResponse = await getImageUrl(file);
        const imageUrl = uploadResponse.url;
        setValue((prev) => ({
          ...prev,
          image: imageUrl,
        }));
        setFileName(file.name);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const { mutate } = usePostUsersMyCardsMutation();

  const handleSubmit = () => {
    const hasEmptyValue = Object.values(value).some((val) => val === "");
    if (hasEmptyValue) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    mutate(value, {
      onSuccess: () => {
        router.push("/mygallery");
      },
    });
  };

  console.log(value);

  return (
    <div className={styles["create-card-container"]}>
      <div className={styles["create-card-title"]}>포토카드 생성</div>
      <div className={styles["create-card-input-container"]}>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>포토카드 이름</label>
          <Input
            style={"default"}
            option={"default"}
            placeholder={"포토카드 이름을 입력해 주세요"}
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />
        </div>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>등급</label>
          <Dropdown
            placeholder={"등급을 선택해 주세요"}
            style={520}
            options={"grades"}
            onChange={(option) => handleDropdownChange(option, "grades")}
          />
        </div>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>장르</label>
          <Dropdown
            placeholder={"장르를 선택해 주세요"}
            style={520}
            options={"genres"}
            onChange={(option) => handleDropdownChange(option, "genres")}
          />
        </div>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>가격</label>
          <Input
            style={"default"}
            option={"default"}
            placeholder={"가격을 입력해 주세요"}
            value={value.price}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*$/.test(input)) {
                setValue({ ...value, price: parseInt(input) || 0 });
              }
            }}
          />
        </div>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>총 발행량</label>
          <Input
            style={"default"}
            option={"default"}
            placeholder={"총 발행량을 입력해 주세요"}
            value={value.quantity}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*$/.test(input)) {
                setValue({ ...value, quantity: parseInt(input) || 0 });
              }
            }}
          />
        </div>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>사진 업로드</label>
          <div className={styles["create-card-input-upload-wrapper"]}>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className={styles["create-card-input-upload"]}>
              {fileName ? (
                <span style={{ color: "white", fontWeight: "400" }}>
                  {fileName}
                </span>
              ) : (
                "사진 업로드"
              )}
            </div>
            <Button
              text={"파일 선택"}
              style={"thin-black-120px"}
              onClick={handleButtonClick}
            />
          </div>
        </div>
        <div className={styles["create-card-input-wrapper"]}>
          <label className={styles["create-card-label"]}>포토카드 설명</label>
          <Input
            style={"textarea"}
            option={"textarea"}
            placeholder={"카드 설명을 입력해 주세요"}
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
          />
        </div>
        <div className={styles["create-card-btn"]}>
          <Button
            style={"thin-main-520px"}
            text={"생성하기"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
