// src/components/client/ui/UndoListButton.client.tsx
import React, { useContext } from "react";
import { useTodoContext } from "../context/TodoContext"; // TodoContext のインポート
import { Todo } from "@/components/models/interface";
import Image from "next/image";

interface UndoListButtonProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeItem: (index: number) => void;
}

const UndoListButton: React.FC<UndoListButtonProps> = ({
  todos,
  setTodos,
  removeItem,
}) => {
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
      className="fixed bottom-4 left-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image src={"/DeleteButtonUp.png"} alt="削除" width={27} height={27} priority />
    </button>
  );
};

export default UndoListButton;
