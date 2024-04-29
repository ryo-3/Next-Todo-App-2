"use client";
import { Todo } from "@/components/models/interface";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import useCreateTodo from "./data/useCreateTodo";
import useUpdateTodos from "./data/useUpdateTodos";
import useInputValidation from "./data/useInputValidation";
import useHandleSubmit from "./data/useHandleSubmit";
import useLocalStorage from "./data/useLocalStorage";
import useInputChange from "./data/useInputChange";
import useToggleTodoComplete from "./data/useToggleTodoComplete";
import useScrollFixed from "./data/useScrollFixed";
import useSelectionTimeout from "./data/useSelectionTimeout";
import useDropTodo from "./data/useDropTodo";

function useTodoManagement() {
  const { inputValue, setInputValue, handleChange } = useInputChange();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { toggleTodoComplete } = useToggleTodoComplete(todos, setTodos);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fixedStyle, formRef , placeholderStyle } = useScrollFixed();
  const { selectedId, handleSelect, resetTimeoutOnFocusChange } =
    useSelectionTimeout();
  const { onDragEnd } = useDropTodo(todos, setTodos);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  // フォーカスが変わった際の処理はこのフック内で完結
  useEffect(() => {
    const handleFocus = () => resetTimeoutOnFocusChange(document.hasFocus());
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleFocus);
    };
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

  const updateTodo = useCallback(
    (id: number, newText: string) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      });
      setTodos(updatedTodos);
    },
    [todos, setTodos]
  );

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
    placeholderStyle,
    updateTodo,
    resetTimeoutOnFocusChange,
    onDragEnd,
  };
}

export default useTodoManagement;
