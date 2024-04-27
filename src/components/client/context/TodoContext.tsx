// src/components/client/context/TodoContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Todo } from "@/components/models/interface"; // 正しいパスに注意してください。

interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  deletedItems: { item: Todo; deletedIndex: number }[];
  setDeletedItems: Dispatch<
    SetStateAction<{ item: Todo; deletedIndex: number }[]>
  >;
  handleDelete: (id: number) => void;
  onClick: () => void; // onClickプロパティを追加
}

const defaultTodoContext: TodoContextType = {
  todos: [],
  setTodos: () => {},
  deletedItems: [],
  setDeletedItems: () => {},
  handleDelete: () => {},
  onClick: () => {}, // onClickプロパティを追加
  
};

const TodoContext = createContext<TodoContextType>(defaultTodoContext);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deletedItems, setDeletedItems] = useState<
    // 削除したTodoアイテムと　その配列を記憶
    { item: Todo; deletedIndex: number }[]
  >([]);

  const handleDelete = (id: number) => {
    const deletedIndex = todos.findIndex((todo) => todo.id === id);
    // 除したアイテムのインデックス番号を取得し、deletedItems に追加
    if (deletedIndex !== -1) {
      const deletedTodo = todos[deletedIndex];
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      // ログに削除するアイテムとインデックス番号を出力
      console.log("Deleting:", deletedTodo, "at index:", deletedIndex);
      setTodos(updatedTodos);
      setDeletedItems([...deletedItems, { item: deletedTodo, deletedIndex }]);
    } else {
      console.log("Item with id:", id, "not found.");
    }
  };

  const onClick = () => {
    // onClick関数の実装
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        deletedItems,
        setDeletedItems,
        handleDelete,
        onClick
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext); // カスタムフックを提供してアクセスを容易にします。
