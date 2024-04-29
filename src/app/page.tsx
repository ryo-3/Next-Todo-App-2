"use client";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import { TodoProvider } from "@/components/client/context/TodoContext";
import { DeletedItemProvider } from "@/components/client/context/DeletedItemContext";
import { UndoStackProvider } from "@/components/client/context/UndoStackContext";
import useTodoManagement from "@/components/client/hooks/useManagement";
import TodoForm from "@/components/client/ui/TodoForm";
import TodoList from "@/components/client/ui/TodoList";
import FloatingActionButton from "@/components/client/ui/AddTodoButton";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";

const Page: React.FC = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
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
    updateTodo,
    resetTimeoutOnFocusChange,
  } = useTodoManagement();

  return (
    <TodoProvider>
      <DeletedItemProvider>
        <UndoStackProvider>
          <main>
            <FloatingActionButton
              onClick={handleButtonClick}
              inputRef={inputRef}
            />
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
                updateTodo={updateTodo}
                onEditingStateChange={resetTimeoutOnFocusChange}
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
        </UndoStackProvider>
      </DeletedItemProvider>
    </TodoProvider>
  );
};

export default Page;
