// src/components/client/ui/UndoListButton.client.tsx
import React from "react";
import { useTodoContext } from "../context/TodoContext";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import { Todo, UndoListButtonProps } from "@/components/models/interface";
import Image from "next/image";

const UndoListButton: React.FC<UndoListButtonProps> = ({ todos, setTodos }) => {
  const { setTodos: setTodosContext } = useTodoContext();
  const { deletedItems, setDeletedItems } = useDeletedItemContext();

  const undoRemoval = () => {
    if (deletedItems.length > 0) {
      const lastDeleted = deletedItems[deletedItems.length - 1]; // 最後のアイテムを参照
      const updatedDeletedItems = deletedItems.slice(0, -1); // 最後の要素を除いた新しい配列を作成
  
      const restoredTodos = [...todos];
      restoredTodos.splice(lastDeleted.deletedIndex, 0, lastDeleted.item);
  
      setTodos(restoredTodos);
      setDeletedItems(updatedDeletedItems);
      console.log("Restored item:", lastDeleted.item);
    }
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