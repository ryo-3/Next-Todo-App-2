"use client";
import React, { useState, useEffect } from "react";
import useInputChange from "@/components/client/hooks/useInputChange";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import { MainProps } from "@/components/models/interface";

const Main: React.FC<MainProps> = ({ todos, setTodos }) => {
  const { inputValue, handleChange } = useInputChange();
  const { handleSubmit, error } = useTodoManagement(
    inputValue,
    todos,
    setTodos,
    handleChange
  );

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="container mb-4 relative smd:justify-start"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="入力欄 ..."
          className="border p-2 rounded mr-2 w-9/12 focus:outline-none focus:border-green-800"
        />
        {error && <div className="error">{error}</div>}
        <button
          type="submit"
          className="bg-emerald-600 text-white font-bold py-2 px-3.5 rounded ss:px-4"
        >
          追加
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id.toString()}
            className="container bg-emerald-100 p-2 rounded mb-1 text-neutral-900"
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
