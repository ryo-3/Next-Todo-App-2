"use client";
import React, { FormEvent, useState } from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import { TodoProvider } from "@/components/client/context/TodoContext";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";
import TodoList from "@/components/client/ui/TodoList";
import TodoForm from "@/components/client/ui/TodoFrom"; // ファイル名が "TodoForm" になるように修正が必要
import FloatingActionButton from "@/components/client/ui/FloatingActionButton";
import FooterTodoForm from "@/components/client/ui/FooterTodoForm ";

const Page: React.FC = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
    setInputValue,
    handleSubmit,
    error,
    handleSelect,
    selectedId,
    toggleTodoComplete,
    loading,
    removeItem,
  } = useTodoManagement();
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm); // フォームの表示状態をトグル
  };

  const handleNewSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!inputValue) {
      setShowForm(false); // フォームが空の場合、フォームを閉じる
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(""); // 入力をクリア
    setShowForm(false); // フォームを閉じる
  };

  return (
    <TodoProvider>
      <main>
        <FloatingActionButton onClick={handleButtonClick} />
        {showForm && (
          <FooterTodoForm
            inputValue={inputValue}
            handleChange={handleChange}
            handleSubmit={handleNewSubmit}
            error={error}
          />
        )}
        <TodoForm
          inputValue={inputValue}
          handleChange={handleChange}
          handleSubmit={handleNewSubmit}
          error={error}
        />
        {loading ? (
          <div className="text-stone-500">Loading...</div>
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
          isTodoCompleted={todos.some(todo => todo.completed)}
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
