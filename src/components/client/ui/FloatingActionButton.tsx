import Image from 'next/image';
import React from 'react';

type Props = {
  onClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const FloatingActionButton: React.FC<Props> = ({ onClick, inputRef }) => {
  const handleClick = () => {
    onClick(); // 任意の追加ロジック
    setTimeout(() => inputRef.current?.focus(), 0); // フォーカスを設定
  };

  return (
    <button
      onClick={handleClick}
      className="fixed z-10 bottom-20 right-4 bg-white w-14 h-14 border border-stone-300 flex justify-center items-center rounded-full"
    >
         <Image src={"/plusBtn.png"} alt="追加" width={30} height={30} priority />
    </button>
  );
};

export default FloatingActionButton;
