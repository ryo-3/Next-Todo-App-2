// components/client/ui/UndoListButton.client.tsx
import React, { useState } from 'react';
import { Todo } from '@/components/models/interface';

interface UndoListButtonProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const UndoListButton: React.FC<UndoListButtonProps> = ({ todos, setTodos }) => {
  const [deletedItems, setDeletedItems] = useState<Todo[]>([]);

  const removeItem = (index: number) => {
    const removedItem = todos.splice(index, 1)[0];
    setDeletedItems((prevDeletedItems) => [...prevDeletedItems, removedItem]);
  };

  const undoRemoval = () => {
    if (deletedItems.length > 0) {
      const restoredItem = deletedItems.pop();
      if (restoredItem) {
        setTodos((prevTodos) => [...prevTodos, restoredItem]);
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