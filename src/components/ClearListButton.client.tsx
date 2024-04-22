// ClearListButton.client.tsx
"use client";
import React from 'react';

interface ClearListButtonProps {
  onClear: () => void;
}

const ClearListButton: React.FC<ClearListButtonProps> = ({ onClear }) => {
  const handleClear = () => {
    if (window.confirm("リストを全て削除しますか？")) {
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