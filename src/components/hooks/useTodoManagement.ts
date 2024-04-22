import { Dispatch, SetStateAction } from "react";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";
import { Todo } from "../models/interface";

function useTodoManagement(
  inputValue: string,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
) {
  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);

  const validator = (value: string) => value.trim().length > 0;
  const { validateInput, error } = useInputValidation(validator, inputValue);

  const { handleSubmit } = useHandleSubmit(
    validateInput,
    createTodo,
    updateTodos
  );

  return { handleSubmit, error };
}

export default useTodoManagement;