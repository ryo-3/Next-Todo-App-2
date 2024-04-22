"use client";
import React from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { Todo } from "@/components/models/interface";
import useInputChange from "@/components/hooks/useInputChange";
import useInputValidation from "@/components/hooks/useInputValidation";
import useHandleSubmit from "@/components/hooks/useHandleSubmit";
import useCreateTodo from "@/components/hooks/useCreateTodo";
import useUpdateTodos from "@/components/hooks/useUpdateTodos ";

const Main = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { inputValue, handleChange } = useInputChange(); // useInputChange フックを使用
  const { validateInput, error } = useInputValidation(
    (value) => value.trim().length > 0,
    inputValue
  );

  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);
  const { handleSubmit } = useHandleSubmit(
    validateInput,
    createTodo,
    updateTodos
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
          <li key={todo.id.toString()} className=" container bg-blue-100 p-2 rounded mb-1">
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
