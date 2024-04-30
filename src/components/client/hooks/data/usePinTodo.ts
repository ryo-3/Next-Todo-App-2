import { useCallback, Dispatch, SetStateAction } from "react";

interface UsePinTodo {
  pinItem: (id: number) => void;
  handlePinClick: (id: number | null) => void;
}

const usePinTodo = (pinnedIds: number[], setPinnedIds: Dispatch<SetStateAction<number[]>>): UsePinTodo => {
  const pinItem = useCallback((id: number) => {
    setPinnedIds((prev) => {
      const isPinned = prev.includes(id);
      return isPinned ? prev.filter((pid) => pid !== id) : [...prev, id];
    });
  }, [setPinnedIds]);

  const handlePinClick = useCallback(
    (id: number | null) => {
      if (id === null) {
        console.log("No ID provided for pinning.");
        return;
      }
      pinItem(id);
    },
    [pinItem]
  );

  return { pinItem, handlePinClick };
};

export default usePinTodo;