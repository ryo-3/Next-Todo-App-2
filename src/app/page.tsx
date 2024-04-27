"use client";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import { TodoProvider } from "@/components/client/context/TodoContext";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";
import TodoList from "@/components/client/ui/TodoList";
import FloatingActionButton from "@/components/client/ui/AddTodoButton";
import TodoForm from "@/components/client/ui/TodoForm";

const Page: React.FC = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
    deletedItems,
    setDeletedItems,
    handleSelect,
    toggleTodoComplete,
    selectedId,
    error,
    loading,
    removeItem,
    showForm,
    inputRef,
    handleButtonClick,
    handleFormSubmit,
    fixedStyle,
    formRef,
    // undoRemoval,
  } = useTodoManagement();

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
        //   deletedItems={deletedItems}
        //   setDeletedItems={setDeletedItems}
        //   todos={todos}
        //   setTodos={setTodos}
        //   onClick={undoRemoval}
        />
      </main>
    </TodoProvider>
  );
};

export default Page;
