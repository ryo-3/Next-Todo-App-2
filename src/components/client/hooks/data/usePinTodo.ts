import { useCallback, Dispatch, SetStateAction } from "react";

interface UsePinTodo {
  pinItem: (id: number) => void;
  handlePinClick: (id: number | null) => void;
}

// usePinTodoフックは、指定されたIDのTodoアイテムのピン止め状態を管理します。
const usePinTodo = (
  pinnedIds: number[], 
  setPinnedIds: Dispatch<SetStateAction<number[]>>
): UsePinTodo => {
  // 指定されたIDをピン止めまたはピン止め解除する関数
  const pinItem = useCallback((id: number) => {
    // 現在のピン止めIDリストを更新
    setPinnedIds((prev) => {
      const isPinned = prev.includes(id);
      // 既にピン止めされている場合は、そのIDをリストから除去
      return isPinned ? prev.filter((pid) => pid !== id) : [...prev, id];
    });
  }, [setPinnedIds]);

  // クリックイベントに反応して、ピン止めまたはピン止め解除を行う関数
  const handlePinClick = useCallback(
    (id: number | null) => {
      if (id === null) {
        // IDがnullの場合、エラーログを出力して処理を中断
        console.log("No ID provided for pinning.");
        return;
      }
      // 有効なIDがある場合、ピン止め操作を実行
      pinItem(id);
    },
    [pinItem]
  );

  return { pinItem, handlePinClick };
};

export default usePinTodo;
