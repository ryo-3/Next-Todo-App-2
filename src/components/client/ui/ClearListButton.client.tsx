// ClearListButton.client.tsx
"use client";
import React from "react";
import Image from "next/image"; // Image コンポーネントをインポート

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
    <button onClick={handleClear} className="fixed bottom-10 right-8">
      <Image
        src="/DeleteButton.svg" // 画像のパス
        alt="削除"
        width={30}
        height={30}
      />
    </button>
  );
};

export default ClearListButton;
