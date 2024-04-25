// FloatingActionButton.tsx
import React from "react";

type Props = {
  onClick: () => void; // ここで onClick の型を定義
};

const FloatingActionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-20 bg-blue-500 text-white p-3 rounded-full"
    >
      +
    </button>
  );
};

export default FloatingActionButton;
