import { Dispatch, SetStateAction, useState } from "react";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useHandleSubmit from "./useHandleSubmit";
import { Todo } from "../models/interface";

function useTodoManagement(
  inputValue: string,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
) {
  const [error, setError] = useState<string>("");
  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);

  const validateInput = () => {
    const isValid = inputValue.trim().length > 0;
    if (!isValid) {
      setError("!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput()) {
      const newTodo = createTodo();
      updateTodos(newTodo);
    }
  };

  return { createTodo, updateTodos, handleSubmit, error };
}

export default useTodoManagement;
