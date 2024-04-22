// そしてuseTodoListフックの中でこのTodo型を使います:
import { useState } from "react";
import { Todo } from "../models/interface"; // 正しいパスに修正してください

export function useTodoList(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return { todos, addTodo, removeTodo };
}