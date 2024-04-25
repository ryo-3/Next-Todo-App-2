"use client";
import React from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
// import useScrollFixed from "@/components/client/hooks/useHeadrScrollFixed";
import { TodoProvider } from "@/components/client/context/TodoContext";

import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";
import TodoList from "@/components/client/ui/TodoList";
import TodoForm from "@/components/client/ui/TodoFrom";

const Page = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
    handleSubmit,
    error,
    handleSelect,
    selectedId,
    toggleTodoComplete,
    loading,
    removeItem,
  } = useTodoManagement();
//   const { placeholderStyle, formRef, fixedStyle } = useScrollFixed();

  return (
    <TodoProvider>
      <main>
        {/* <div style={placeholderStyle}></div>
        <div ref={formRef} style={fixedStyle}> */}
        <div>
          <TodoForm
            inputValue={inputValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
          />
        </div>
        {loading ? (
          <div className="text-stone-500">リスト読み込み中...</div>
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
