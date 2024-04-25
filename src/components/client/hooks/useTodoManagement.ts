// components/client/hooks/useTodoManagement.ts
"use client"
import { useCallback, useEffect, useState } from "react";
import { Todo } from "../../models/interface";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";
import useLocalStorage from "./useLocalStorage";
import useInputChange from "./useInputChange";
import useToggleTodoComplete from "./useToggleTodoComplete";
import useSelectTodo from "./useSelectTodo";

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

  const removeItem = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    },
    [todos]
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
    removeItem,
  };
}

export default useTodoManagement;