// usePinTodo.ts
import { useCallback, Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Todo } from '@/components/models/interface'; // Todoの型がここに含まれていることを仮定

interface UsePinTodo {
  togglePin: (id: number) => void;
  pinAnimation: { [key: number]: string };
}

const usePinTodo = (
  pinnedIds: number[],
  setPinnedIds: Dispatch<SetStateAction<number[]>>,
  todos: Todo[] // 新しいパラメータ
): UsePinTodo => {
  const [pinAnimation, setPinAnimation] = useState<{ [key: number]: string }>({});
  const initialLoad = useRef(true);

  useEffect(() => {
    todos.forEach((todo) => {
      const isPinned = pinnedIds.includes(todo.id);
      let animationClass = "hidden"; // デフォルトでは非表示
      if (isPinned) {
        animationClass = "pin-activate-animation";
      } else if (!initialLoad.current) {
        animationClass = "";
      }

      setPinAnimation((prev) => ({
        ...prev,
        [todo.id]: animationClass,
      }));
    });
    initialLoad.current = false; // 初期ロードが終了したらフラグを更新
  }, [todos, pinnedIds]);

  const togglePin = (id: number) => {
    const isPinned = pinnedIds.includes(id);
  
    if (isPinned) {
      setTimeout(() => {
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "pin-deactivate-animation",
        }));
      }, 0);
  
      setTimeout(() => {
        setPinnedIds(pinnedIds.filter((pinnedId) => pinnedId !== id));
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "hidden",
        }));
      }, 800);
    } else {
      setTimeout(() => {
        setPinnedIds([...pinnedIds, id]);
      }, 800);
  
      setTimeout(() => {
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "pin-activate-animation",
        }));
      }, 0);
    }
  };

  return { togglePin, pinAnimation };
};

export default usePinTodo;
