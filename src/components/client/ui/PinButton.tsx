// PinButton.tsx
import React, { useState } from "react";
import Image from "next/image";

type PinButtonProps = {
  isPinned: boolean;
  onClick: () => void;
};

const PinButton: React.FC<PinButtonProps> = ({ isPinned, onClick }) => {
  const [animationClass, setAnimationClass] = useState("noButton-animation");

  const handleButtonClick = () => {
    // アニメーションのクラスを変更
    const newClass = isPinned
      ? "pinButton-deactivate-animation"
      : "pinButton-activate-animation";

    setAnimationClass(newClass);
    onClick();

    // アニメーション後に初期位置に戻す
    setTimeout(() => {
      setAnimationClass("noButton-animation");
    }, 260); // アニメーションの長さに応じて変更
  };

  return (
    <button
      onClick={handleButtonClick}
      className="fixed z-10 bottom-4 left-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <div className={animationClass}>
        <Image src="/pin.png" alt="Pin" width={24} height={24} priority />
      </div>
    </button>
  );
};

export default React.memo(PinButton);
