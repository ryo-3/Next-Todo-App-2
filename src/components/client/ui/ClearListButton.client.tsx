// ClearListButton.client.tsx
"use client";
import React from 'react';

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
    <button onClick={handleClear} className="text-red-500 cursor-pointer">
      全削除
    </button>
  );
};

export default ClearListButton;