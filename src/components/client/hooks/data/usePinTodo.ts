// usePinTodo.ts
import { useCallback, Dispatch, SetStateAction, useState } from 'react';

interface UsePinTodo {
  togglePin: (id: number) => void;
  pinAnimation: { [key: number]: string };
}

const usePinTodo = (
  pinnedIds: number[],
  setPinnedIds: Dispatch<SetStateAction<number[]>>
): UsePinTodo => {
  const [pinAnimation, setPinAnimation] = useState<{ [key: number]: string }>({});

  const togglePin = (id: number) => {
    const isPinned = pinnedIds.includes(id);
  
    if (isPinned) {
      // ピン解除アニメーションを遅延開始
      setTimeout(() => {
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "pin-deactivate-animation",
        }));
      }, 0); // <== アニメーションの開始タイミング
  
      // ピン解除アニメーションの後でピンを解除
      setTimeout(() => {
        setPinnedIds(pinnedIds.filter((pinnedId) => pinnedId !== id));
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "hidden", // アニメーションをリセットするか、非表示にする
        }));
      }, 800); // <== ピン解除のタイミング
    } else {
      // ピンを固定する直前のアクション
      setTimeout(() => {
        setPinnedIds([...pinnedIds, id]);
      }, 800); // <== ピン固定前のタイミング
  
      // ピン固定アニメーションの開始
      setTimeout(() => {
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "pin-activate-animation",
        }));
      }, 0); // <== ピン固定アニメーションのタイミング
    }
  };
  

  return { togglePin, pinAnimation };
};

export default usePinTodo;
