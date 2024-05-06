import React, { useState, useEffect } from "react";
import Image from "next/image";

type PinButtonProps = {
  isPinned: boolean;
  onClick: () => void;
};

const PinButton: React.FC<PinButtonProps> = ({ isPinned, onClick }) => {
  const [animationClass, setAnimationClass] = useState("noButton-animation");
  const [fadeInClass, setFadeInClass] = useState("fade-in hide");

  useEffect(() => {
    setFadeInClass("fade-in show");
  }, []);

  const handleButtonClick = () => {
    // アニメーションのクラスを画像に適用
    const newClass = isPinned
      ? "pinButton-deactivate-animation"
      : "pinButton-activate-animation";

    setAnimationClass(newClass);
    onClick();

    // アニメーション後に画像のアニメーションを初期化
    setTimeout(() => {
      setAnimationClass("noButton-animation");
    }, 260); // アニメーションの長さに応じて変更
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`fixed z-50 bottom-20 right-20 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center ${fadeInClass}`}
    >
      <div className={animationClass}>
        <Image src="/pin.png" alt="Pin" width={24} height={24} priority />
      </div>
    </button>
  );
};

export default React.memo(PinButton);
