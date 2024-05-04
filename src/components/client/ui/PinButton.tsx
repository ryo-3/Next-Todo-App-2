import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type PinButtonProps = {
  isPinned: boolean;
  onClick: () => void;
};

const PinButton: React.FC<PinButtonProps> = ({ isPinned, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const animationDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonClicked) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
        setButtonClicked(false);
      }, 500); // 0.5秒間アニメーションを実行
      return () => clearTimeout(timer);
    }
  }, [buttonClicked]);

  useEffect(() => {
    const animationDiv = animationDivRef.current;
    const handleTransitionEnd = () => {
      if (!isActive) {
        animationDiv?.classList.add("no-animation");
      }
    };

    animationDiv?.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      animationDiv?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isActive]);

  return (
    <button
      onClick={() => {
        console.log("PinButton: Button clicked");
        setButtonClicked(true); // ボタンがクリックされたことを設定
        onClick(); // handlePinClick を呼び出す
      }}
      className="fixed z-10 bottom-4 left-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <div
        ref={animationDivRef}
        className={
          isActive
            ? isPinned
              ? "pinButton-deactivate-animation"
              : "pinButton-activate-animation"
            : "noButton-animation"
        }
      >
        <Image src="/pin.png" alt="Pin" width={24} height={24} priority />
      </div>
    </button>
  );
};

export default PinButton;
