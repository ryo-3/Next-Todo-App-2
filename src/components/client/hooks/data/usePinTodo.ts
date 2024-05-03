import { useCallback, Dispatch, SetStateAction } from "react";

interface UsePinTodo {
  handlePinClick: () => void;
}

const usePinTodo = (
  selectedId: number | null,
  pinnedIds: number[],
  setPinnedIds: Dispatch<SetStateAction<number[]>>
): UsePinTodo => {
  const pinItem = useCallback(() => {
    // console.log(`pinItem: Selected ID - ${selectedId}`);
    if (selectedId === null) {
      console.warn("pinItem: No item selected.");
      return;
    }

    setPinnedIds((prev) => {
      const isPinned = prev.includes(selectedId);
    //   console.log("pinItem: Is Pinned before toggle:", isPinned);

      const updatedIds = isPinned
        ? prev.filter((pid) => pid !== selectedId)
        : [...prev, selectedId];

      console.log("Updated pinnedIds:", updatedIds);
      return updatedIds;
    });
  }, [selectedId, setPinnedIds]);

  const handlePinClick = useCallback(() => {
    console.log("handlePinClick: Executing pinItem");
    pinItem(); // 1回だけ実行
  }, [pinItem]);

  return { handlePinClick };
};

export default usePinTodo;
