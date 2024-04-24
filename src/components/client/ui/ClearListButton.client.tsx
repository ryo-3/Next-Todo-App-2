// ClearListButton.tsx
import React, { useState } from "react";
import Image from "next/image";

interface ClearListButtonProps {
  onClear: (onlyCompleted: boolean) => void; // onClearにパラメータを追加
  isTodoCompleted: boolean;
}

const ClearListButton: React.FC<ClearListButtonProps> = ({
  onClear,
  isTodoCompleted,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClear = () => {
    const message = isTodoCompleted
      ? "選択したリストを削除しますか？"
      : "リストを全て削除しますか？";

    if (window.confirm(message)) {
      onClear(isTodoCompleted);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getImageSrc = () => {
    // isTodoCompletedがtrueの場合は常にアクティブなアイコンを表示
    if (isTodoCompleted) {
      return "/DeleteButtonActive.png";
    } else {
      // ホバー状態によってアイコンを切り替え
      return isHovered ? "/DeleteButtonActive.png" : "/DeleteButton.png";
    }
  };

  return (
    <button
      onClick={handleClear}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-4 right-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image src={getImageSrc()} alt="削除" width={27} height={27} priority />
    </button>
  );
};

export default ClearListButton;
