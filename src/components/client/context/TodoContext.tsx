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
  deletedItems: Todo[];
  setDeletedItems: Dispatch<SetStateAction<Todo[]>>;
}

const defaultTodoContext: TodoContextType = {
  todos: [],
  setTodos: () => {},
  deletedItems: [],
  setDeletedItems: () => {},
};

const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  deletedItems: [],
  setDeletedItems: () => {},
});

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deletedItems, setDeletedItems] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, deletedItems, setDeletedItems }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext); // カスタムフックを提供してアクセスを容易にします。
