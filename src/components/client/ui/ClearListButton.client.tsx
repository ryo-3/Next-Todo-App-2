import React, { useState } from "react";
import Image from "next/image";

interface ClearListButtonProps {
  onClear: () => void;
  isTodoCompleted: boolean;
}

const ClearListButton: React.FC<ClearListButtonProps> = ({ onClear,isTodoCompleted }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClear = () => {
    console.log("handleClear called");
    if (window.confirm("リストを全て削除しますか？")) {
      console.log("Clear confirmed");
      onClear();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getImageSrc = () => {
    if (isTodoCompleted) {
      return "/DeleteButtonActive.png"; // チェックが入っている時の画像
    }
    return isHovered ? "/DeleteButtonActive.png" : "/DeleteButton.png";
  };

  return (
    <button
      onClick={handleClear}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-4 right-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image src={getImageSrc()} alt="削除" width={22} height={22} priority />
    </button>
  );
};

export default ClearListButton;
