// src/components/client/hooks/useTodoManagement.ts
"use client";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";
import useLocalStorage from "./useLocalStorage";
import useInputChange from "./useInputChange";
import useToggleTodoComplete from "./useToggleTodoComplete";
import useSelectTodo from "./useSelectTodo";
import { Todo } from "@/components/models/interface";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import useBtnClickFixed from "@/components/client/hooks/useBtnClickFixed";
import { useTodoContext } from "../context/TodoContext";

function useTodoManagement() {
  const { inputValue, setInputValue, handleChange } = useInputChange();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { selectedId, handleSelect } = useSelectTodo();
  const { toggleTodoComplete } = useToggleTodoComplete(todos, setTodos);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true); // フォームの表示を制御
  const inputRef = useRef<HTMLInputElement>(null); // 正しくリファレンスを生成
  const { fixedStyle, formRef } = useBtnClickFixed();
  const { deletedItems, setDeletedItems } = useTodoContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const { createTodo } = useCreateTodo(inputValue, todos.length);
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

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // ボタンクリックで直接フォームにフォーカス
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSubmit(event);
  };

  const removeItem = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

//   const undoRemoval = () => {
//     if (deletedItems.length > 0) {
//       const { item: lastItem, deletedIndex } =
//         deletedItems[deletedItems.length - 1];
//       const updatedDeletedItems = deletedItems.slice(
//         0,
//         deletedItems.length - 1
//       );
//       setDeletedItems(updatedDeletedItems);

//       const newTodos = [...todos];
//       newTodos.splice(deletedIndex, 0, lastItem);
//       setTodos(newTodos);

//       console.log(`Item "${lastItem.text}" restored at index ${deletedIndex}`);
//     }
//   };

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
    showForm,
    setShowForm,
    inputRef,
    handleButtonClick,
    handleFormSubmit,
    fixedStyle,
    formRef,
    index: todos.length, // indexを返す
    deletedItems,
    setDeletedItems,
    removeItem,
    // undoRemoval,
  };
}

export default useTodoManagement;