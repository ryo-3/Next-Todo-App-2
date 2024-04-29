"use client";
import useCreateTodo from "./data/useCreateTodo";
import useUpdateTodos from "./data/useUpdateTodos";
import useInputValidation from "./data/useInputValidation";
import useHandleSubmit from "./data/useHandleSubmit";
import useLocalStorage from "./data/useLocalStorage";
import useInputChange from "./data/useInputChange";
import useToggleTodoComplete from "./data/useToggleTodoComplete";
import useSelectTodo from "./data/useSelectTodo";
import { Todo } from "@/components/models/interface";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import useBtnClickFixed from "@/components/client/hooks/data/useScrollFixed";

function useTodoManagement() {
  const { inputValue, setInputValue, handleChange } = useInputChange();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { selectedId, handleSelect } = useSelectTodo();
  const { toggleTodoComplete } = useToggleTodoComplete(todos, setTodos);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true); // フォームの表示を制御
  const inputRef = useRef<HTMLInputElement>(null); // 正しくリファレンスを生成
  const { fixedStyle, formRef } = useBtnClickFixed();

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

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // ボタンクリックで直接フォームにフォーカス
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSubmit(event);
  };

  const updateTodo = useCallback((id: number, newText: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }, [todos, setTodos]);
  

  return {
    validateInput,
    inputValue,
    setInputValue,
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
    showForm,
    setShowForm,
    inputRef,
    handleButtonClick,
    handleFormSubmit,
    fixedStyle,
    formRef,
    updateTodo, // 追加
  };
}

export default useTodoManagement;
