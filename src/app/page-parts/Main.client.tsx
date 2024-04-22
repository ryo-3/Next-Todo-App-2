"use client";
import React from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { Todo } from "@/components/models/interface";
import useInputChange from "@/components/hooks/useInputChange";
import useInputValidation from "@/components/hooks/useInputValidation";
import useHandleSubmit from "@/components/hooks/useHandleSubmit";

const Main = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { inputValue, handleChange } = useInputChange(); // useInputChange フックを使用
  const { validateInput, error } = useInputValidation(
    (value) => value.trim().length > 0,
    inputValue
  );

  const { handleSubmit } = useHandleSubmit(
    todos,
    setTodos,
    inputValue,
    handleChange,
    validateInput
  );

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="新しいタスクを入力"
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
      <ul className="list-disc pl-5">
        {todos.map((todo: Todo) => (
          <li key={todo.id.toString()} className="bg-blue-100 p-2 rounded mb-1">
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
