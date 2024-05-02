import React, { useState } from "react";
import Image from "next/image";

type PinButtonProps = {
  onClick: () => void; // シンプルな関数型に変更
  
};

const PinButton: React.FC<PinButtonProps> = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 200);
    onClick(); // イベントオブジェクトを渡さずに関数を直接呼び出す
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <div className={isActive ? "translate-active" : "translate-inactive"}>
        <Image src="/pin.png" alt="Pin" width={24} height={24} priority />
      </div>
    </button>
  );
};

export default PinButton;
