// src/components/client/ui/UndoListButton.client.tsx
import React, { useContext } from "react";
import { useTodoContext } from "../context/TodoContext"; // TodoContext のインポート
import { Todo, UndoListButtonProps } from "@/components/models/interface";
import Image from "next/image";

const UndoListButton: React.FC<UndoListButtonProps> = ({ todos, setTodos }) => {
  const { deletedItems, setDeletedItems } = useTodoContext();

  const undoRemoval = () => {
    if (deletedItems.length > 0) {
      const restoredItem = deletedItems.pop();
      if (restoredItem) {
        const restoredItemWithProperties = { ...restoredItem };
        setTodos([...todos, restoredItemWithProperties]);
        setDeletedItems(deletedItems);
        console.log("Restored item:", restoredItem);
      }
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
