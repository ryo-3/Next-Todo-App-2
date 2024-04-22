"use client";
import React, { useState, useEffect } from "react";
import { Todo } from "@/components/models/interface";
import useLocalStorage from "@/components/hooks/useLocalStorage";

const Main = () => {
  // ローカルストレージから todos を読み込む
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(), // id を number 型として直接設定
        text: inputValue.trim(),
        completed: false
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);  // 更新されたリストを setTodos でローカルストレージに保存
      setInputValue("");  // 入力フィールドをクリア
    }
  };

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
