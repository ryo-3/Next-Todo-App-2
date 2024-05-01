import React, { useState } from 'react';
import Image from 'next/image';

type PinButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PinButton: React.FC<PinButtonProps> = ({ onClick }) => {
    const [isActive, setIsActive] = useState(false);

       const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setIsActive(true); // ボタンがクリックされたときにアクティブ状態にする
        setTimeout(() => setIsActive(false), 200); // 200ミリ秒後に非アクティブ状態に戻る
        onClick?.(e);
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed bottom-4 left-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center `}
            
        >
            <div className={isActive ? 'translate-active' : 'translate-inactive'}>
                <Image
                    src={"/pin.png"}
                    alt="Pin"
                    width={24}
                    height={24}
                    priority
                />
            </div>
        </button>
    );
};

export default PinButton;
