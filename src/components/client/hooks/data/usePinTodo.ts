import { useCallback, Dispatch, SetStateAction } from "react";

interface UsePinTodo {
  handlePinClick: () => void;
}

// usePinTodo フックの定義
const usePinTodo = (
  selectedId: number | null,
  pinnedIds: number[],
  setPinnedIds: Dispatch<SetStateAction<number[]>>
): UsePinTodo => {
  const pinItem = useCallback(() => {
    if (selectedId === null) {
      console.warn("pinItem: No item selected.");
      return;
    }
    console.log(`pinItem: Attempting to pin item ${selectedId}`);
    setPinnedIds((prev) => {
      const isPinned = prev.includes(selectedId);
      const updatedIds = isPinned
        ? prev.filter((pid) => pid !== selectedId)
        : [...prev, selectedId];
      console.log(`pinItem: Updated pinnedIds - ${updatedIds}`);
      return updatedIds;
    });
  }, [selectedId, setPinnedIds]);

  const handlePinClick = useCallback(() => {
    pinItem(); // pinItem を直接呼び出す
  }, [pinItem]);

  return { handlePinClick };
};

export default usePinTodo;
