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
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex justify-between w-11/12  mb-4 relative  smd:justify-start"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="入力欄 ..."
          className="border p-2 rounded mr-2 w-9/12 "
        />
        {error && <div className="error">{error}</div>}
        <button
          type="submit"
          className=" bg-emerald-600 text-white font-bold py-2 px-3.5 rounded ss:px-4"
        >
          追加
        </button>
      </form>
      <ul className="">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id.toString()}
            className="container bg-emerald-100 p-2 rounded mb-1"
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
