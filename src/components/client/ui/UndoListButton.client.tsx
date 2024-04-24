// src/components/client/ui/UndoListButton.client.tsx
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext"; // TodoContext のインポート

const UndoListButton = () => {
  const { deletedItems, setDeletedItems, todos, setTodos } = useContext(TodoContext);

  const undoRemoval = () => {
    if (deletedItems.length > 0) {
      const restoredItem = deletedItems.pop(); // 最後のアイテムを取り出す
      if (restoredItem) { // restoredItem が undefined でないことを確認
        setTodos([...todos, restoredItem]); // todos に復元
        setDeletedItems([...deletedItems]); // deletedItems 更新
      }
    }
  };

  return (
    <button
      onClick={undoRemoval}
      className="fixed bottom-16 right-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
    >
      戻す
    </button>
  );
};

export default UndoListButton;
