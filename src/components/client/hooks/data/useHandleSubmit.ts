// フォームの送信
"use client";
import { Todo } from "../../../models/interface";

const useHandleSubmit = (
  validateInput: () => boolean,
  createTodo: () => Todo,
  updateTodos: (newTodo: Todo) => void
) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput()) {
      const newTodo = createTodo();
      updateTodos(newTodo);
    }
  };

  return { handleSubmit };
};

export default useHandleSubmit;
