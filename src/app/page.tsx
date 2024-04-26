"use client";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import { TodoProvider } from "@/components/client/context/TodoContext";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";
import TodoList from "@/components/client/ui/TodoList";
import FloatingActionButton from "@/components/client/ui/FloatingActionButton";
import TodoForm from "@/components/client/ui/TodoForm";
import useBtnClickFixed from "@/components/client/hooks/useBtnClickFixed";

const Page: React.FC = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
    setInputValue,
    error,
    selectedId,
    handleSelect,
    toggleTodoComplete,
    loading,
    removeItem,
  } = useTodoManagement();
  const [showForm, setShowForm] = useState(true); // フォームの表示を制御
  const inputRef = useRef<HTMLInputElement>(null); // 正しくリファレンスを生成
  const { placeholderStyle, fixedStyle, formRef, setFixed } = useBtnClickFixed();

  const handleButtonClick = () => {
    // setFixed(true); // ボタンクリックでフォームを固定
    if (inputRef.current) {
      inputRef.current.focus();  // ボタンクリックで直接フォームにフォーカス
    }
  };


  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!inputValue) {
      return; // 入力がなければ何もせずに早期リターン
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    // setTodos([...todos, newTodo]); // 新しいTodoを追加　末尾
    setTodos([newTodo , ...todos ]); // 新しいTodoを追加　先頭
    setInputValue(""); // 入力フィールドをクリア
    inputRef.current?.focus(); // 送信後、フォームにフォーカスを戻す
    // setShowForm(true); // フォームを表示し続ける（必要に応じて）
    // setFixed(true); // フォームを固定し続ける（必要に応じて）
  };


  return (
    <TodoProvider>
      <main>
        <FloatingActionButton onClick={handleButtonClick} inputRef={inputRef} />
        {showForm && (
          <div ref={formRef} style={fixedStyle}>
            <TodoForm
              inputValue={inputValue}
              handleChange={handleChange}
              handleSubmit={handleFormSubmit}
              error={error}
              showForm={showForm}
              inputRef={inputRef}
              style={fixedStyle}
            />
          </div>
        )}
        {loading ? (
          <div className=" text-slate-800 pt-6 pl-2">読み込み中...</div>
        ) : (
          <TodoList
            todos={todos}
            setTodos={setTodos}
            selectedId={selectedId}
            handleSelect={handleSelect}
            toggleTodoComplete={toggleTodoComplete}
          />
        )}
        <ClearListButton
          todos={todos}
          setTodos={setTodos}
          isTodoCompleted={todos.some((todo) => todo.completed)}
        />
        <UndoListButton
          todos={todos}
          setTodos={setTodos}
          removeItem={removeItem}
        />
      </main>
    </TodoProvider>
  );
};

export default Page;
