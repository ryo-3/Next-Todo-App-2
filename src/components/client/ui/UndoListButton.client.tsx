// src/components/client/ui/UndoListButton.client.tsx
import React, { useState } from "react";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import { Todo, UndoListButtonProps } from "@/components/models/interface";
import Image from "next/image";
import { useUndoStack } from "../context/UndoStackContext";

const UndoListButton: React.FC<UndoListButtonProps> = ({ todos, setTodos }) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
  const { undoStack, setUndoStack } = useUndoStack();

  const undoRemoval = () => {
    console.log("Current stack:", JSON.stringify(undoStack, null, 2));
    if (undoStack.length === 0) return;
  
    const lastAction = undoStack[undoStack.length - 1];
    console.log("Last action to undo:", JSON.stringify(lastAction, null, 2));
    if (!lastAction) return;
  
    const restoredTodos = [...todos];
    lastAction.items.forEach(({ item, deletedIndex }) => {
      console.log(`Restoring item at index ${deletedIndex}:`, item);
      restoredTodos.splice(deletedIndex, 0, item);
    });
  
    console.log("Restored todos:", JSON.stringify(restoredTodos, null, 2));
    setTodos(restoredTodos);
    setDeletedItems((prev) =>
      prev.filter(
        (delItem) =>
          !lastAction.items.some(
            (actionItem) => actionItem.item === delItem.item
          )
      )
    );
    setUndoStack((prev) => [...prev.slice(0, -1)]);
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
