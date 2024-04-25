// Page.tsx
"use client";
import React from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";
import { TodoProvider } from "@/components/client/context/TodoContext";

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

  const isTodoCompleted = todos.some((todo) => todo.completed);

  return (
    <TodoProvider>
      <main>
        <form
          onSubmit={handleSubmit}
          className="mb-5 relative flex justify-between smd:justify-start"
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="入力欄 ..."
            className="border-2 py-2 pl-3 rounded mr-2 w-9/12 focus:outline-none focus:border-yellow-950"
          />
          {error && <div className="error">{error}</div>}
          <button
            type="submit"
            className="bg-emerald-600 text-white font-bold py-2 px-3.5 rounded ss:px-4"
          >
            追加
          </button>
        </form>
        {loading ? (
          <div className="text-stone-500">リスト読み込み中...</div>
        ) : (
          <ul className="pb-20">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`Todolist flex justify-between items-center ${
                  selectedId === todo.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(todo.id)}
              >
                <span className="listItem">{todo.text}</span>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 w-6 mr-3"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                    className="align-middle h-7 w-7 accent-green-900"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        <ClearListButton
          todos={todos}
          setTodos={setTodos}
          isTodoCompleted={isTodoCompleted}
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
