// ClearListButton.client.tsx
"use client";
import React from "react";
import Image from "next/image";

interface ClearListButtonProps {
  onClear: () => void;
}

const ClearListButton: React.FC<ClearListButtonProps> = ({ onClear }) => {
  const handleClear = () => {
    console.log("handleClear called");
    if (window.confirm("リストを全て削除しますか？")) {
      console.log("Clear confirmed");
      onClear();
    }
  };

  return (
    <button
      onClick={handleClear}
      className="fixed bottom-4 right-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image
        src="/DeleteButton.png"
        alt="削除"
        width={30}
        height={30}
        priority // この画像をページロード時に優先的に読み込む
      />
    </button>
  );
};

export default ClearListButton;
