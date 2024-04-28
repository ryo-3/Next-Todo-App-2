import React, { createContext, useState, useContext } from "react";
import { Todo } from "@/components/models/interface";

interface TodoContextType {
  todos: Todo[];
<<<<<<< HEAD
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
=======
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
>>>>>>> main

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
<<<<<<< HEAD
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
=======
    <TodoContext.Provider value={{ todos, setTodos }}>
>>>>>>> main
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};