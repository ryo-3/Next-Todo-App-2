// Todoリストの更新
"use client";
import { Todo } from "@/components/models/interface";
const useUpdateTodos = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
): { updateTodos: (newTodo: Todo) => void } => {
  const updateTodos = (newTodo: Todo) => {
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    handleChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return { updateTodos };
};

export default useUpdateTodos;