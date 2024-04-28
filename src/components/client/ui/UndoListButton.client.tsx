// src/components/client/ui/UndoListButton.client.tsx
import React, { useState } from "react";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import { Todo, UndoListButtonProps } from "@/components/models/interface";
import Image from "next/image";

const UndoListButton: React.FC<UndoListButtonProps> = ({ todos, setTodos }) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
 


  const undoRemoval = () => {
    const restoredTodos = [...todos];
  
    // deletedItemsを逆順に処理して、削除されたアイテムを元の位置に復元
    const updatedDeletedItems = [...deletedItems];
    while (updatedDeletedItems.length > 0) {
      const lastDeleted = updatedDeletedItems.pop();  // 最後のアイテムを取り出す
      if (lastDeleted) {
        restoredTodos.splice(lastDeleted.deletedIndex, 0, lastDeleted.item);  // 元の位置に復元
        console.log("Restored item:", lastDeleted.item);
      }
    }
  
    setTodos(restoredTodos);
    setDeletedItems(updatedDeletedItems);  // 更新された削除アイテムリストを設定
  };
  
  return (
    <button
      onClick={undoRemoval}
      className="fixed bottom-4 right-20 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image
        src={"/DeleteButtonUp.png"}
        alt="削除"
        width={32}
        height={32}
        priority
      />
    </button>
  );
};

export default UndoListButton;