// Page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import useInputChange from "@/components/client/hooks/useInputChange";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import useLocalStorage from "@/components/client/hooks/useLocalStorage";
import { Todo } from "@/components/models/interface";
import ClearListButton from "@/components/client/ui/ClearListButton.client";

const Page = () => {
  const { inputValue, handleChange } = useInputChange();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { handleSubmit, error } = useTodoManagement(inputValue, todos, setTodos, handleChange);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 擬似的なデータロード時間をシミュレート
    setTimeout(() => {
      setLoading(false); // ロード完了
    }, 200); // 1秒後にロード完了とする
  }, []);

  const clearTodos = () => {
    setTodos([]);
  };

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
          className="border-2 p-2 rounded mr-2 w-9/12 focus:outline-none focus:border-yellow-950"
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
        <div className='text-stone-500'>リスト読み込み中...</div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id.toString()} className="container Todolist">
              {todo.text}
            </li>
          ))}
        </ul>
      )}
      <ClearListButton onClear={clearTodos} />
    </main>
  );
};

export default Page;
