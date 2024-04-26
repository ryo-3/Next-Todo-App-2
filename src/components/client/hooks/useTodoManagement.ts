// components/client/hooks/useTodoManagement.ts
"use client"
import { useCallback, useEffect, useState } from "react";
import { Todo } from "../../models/interface"; // 確認してください、これが正しいパスかどうか

// その他のカスタムフックのインポート
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";
import useLocalStorage from "./useLocalStorage";
import useInputChange from "./useInputChange";
import useToggleTodoComplete from "./useToggleTodoComplete";
import useSelectTodo from "./useSelectTodo";

function useTodoManagement() {
  const { inputValue, setInputValue, handleChange } = useInputChange(); // setInputValue を追加
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
    [todos, setTodos]
  );

  return {
    validateInput,
    inputValue,
    setInputValue, // setInputValue を戻り値に含める
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
