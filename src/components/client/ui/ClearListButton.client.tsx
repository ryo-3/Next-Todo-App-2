import React, { useState } from "react";
import Image from "next/image";
import { ClearListButtonProps } from "@/components/models/interface"; // 必要に応じてインポート

const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const clearTodos = (onlyCompleted: boolean) => {
    if (onlyCompleted) {
      const filteredTodos = todos.filter((todo) => !todo.completed);
      setTodos(filteredTodos);
    } else {
      setTodos([]);
    }
  };

  const handleClear = () => {
    const message = isTodoCompleted
      ? "選択したリストを削除しますか？"
      : "リストを全て削除しますか？";
    if (window.confirm(message)) {
      clearTodos(isTodoCompleted);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getImageSrc = () => {
    return isHovered ? "/DeleteButtonActive.png" : "/DeleteButton.png";
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
