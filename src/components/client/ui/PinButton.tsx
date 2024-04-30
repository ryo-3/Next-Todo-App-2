import React from 'react';
import Image from 'next/image';

type PinButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PinButton: React.FC<PinButtonProps> = ({ onClick }) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log('Inside handleClick', onClick);
        if (onClick) {
            onClick(e);
        } else {
            console.error('onClick is not a function');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-4 left-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
        >
            <Image
                src={"/pin.png"}
                alt="Pin"
                width={24}
                height={24}
                priority
            />
        </button>
    );
};

export default PinButton;
