"use client";
import React from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { Todo } from "@/components/models/interface";
import useInputChange from "@/components/hooks/useInputChange";
import useTodoManagement from "@/components/hooks/useTodoManagement";

const Main = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { inputValue, handleChange } = useInputChange();

  const { handleSubmit, error } = useTodoManagement(
    inputValue,
    todos,
    setTodos,
    handleChange
  );

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex container mb-4 relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="入力欄 ..."
          className="border p-2 rounded mr-2"
        />
        {error && <div className="error">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          追加
        </button>
      </form>
      <ul className="">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id.toString()}
            className="container bg-blue-100 p-2 rounded mb-1"
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;