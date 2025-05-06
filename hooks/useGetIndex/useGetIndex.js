export const optionArray = {
  grades: ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"],
  genres: ["풍경", "인물", "동물", "정물", "추상", "기타"],
  sales: ["판매 중", "판매 완료"],
  sortOptions: ["최신 순", "오래된 순", "높은 가격순", "낮은 가격순"],
  saleMethods: ["판매 중", "교환 제시 대기중"],
};

export const getParamsByOption = (option, optionsType) => {
  const selectedIndex = optionArray[optionsType]?.indexOf(option);

  if (optionsType === "grades") return { grade: selectedIndex };
  if (optionsType === "genres") return { genre: selectedIndex };
  if (optionsType === "sales")
    return { sellout: selectedIndex === 0 ? false : true };
  if (optionsType === "sortOptions") {
    const sortMap = ["recent", "oldest", "highest", "cheapest"];
    return { sort: sortMap[selectedIndex] };
  }
  if (optionsType === "saleMethods")
    return { hasExchangeRequest: selectedIndex === 0 ? false : true };
  return {};
};
