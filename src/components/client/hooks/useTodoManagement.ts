import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Todo } from "../../models/interface";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";
import useLocalStorage from "./useLocalStorage";
import useInputChange from "./useInputChange";
import useToggleTodoComplete from "./useToggleTodoComplete"; // 新しいフックをインポート
import useSelectTodo from "./useSelectTodo"; // 新しいフックをインポート

function useTodoManagement() {
  const { inputValue, handleChange } = useInputChange();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { selectedId, handleSelect } = useSelectTodo();
  const { toggleTodoComplete } = useToggleTodoComplete(todos, setTodos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);
  const { validateInput, error } = useInputValidation(
    (value: string) => value.trim().length > 0,
    inputValue
  );
  const { handleSubmit } = useHandleSubmit(
    validateInput,
    createTodo,
    updateTodos
  );

  return {
    inputValue,
    handleChange,
    todos,
    setTodos,
    handleSubmit,
    handleSelect,
    toggleTodoComplete,
    selectedId,
    error,
    loading,
  };
}

export default useTodoManagement;