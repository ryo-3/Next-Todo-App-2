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
  const { handleSubmit, error, handleSelect, selectedId, toggleTodoComplete } = useTodoManagement(
    inputValue,
    todos,
    setTodos,
    handleChange
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 200);
  }, []);

  const clearTodos = (onlyCompleted = false) => {
    if (onlyCompleted) {
      const filteredTodos = todos.filter(todo => !todo.completed);
      setTodos(filteredTodos);
    } else {
      setTodos([]);
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit} className="mb-5 relative flex justify-between smd:justify-start">
        <input type="text" value={inputValue} onChange={handleChange}
          placeholder="入力欄 ..." className="border-2 p-2 rounded mr-2 w-9/12 focus:outline-none focus:border-yellow-950"/>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="bg-emerald-600 text-white font-bold py-2 px-3.5 rounded ss:px-4">追加</button>
      </form>
      {loading ? <div className='text-stone-500'>リスト読み込み中...</div> : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={`Todolist flex justify-between items-center ${selectedId === todo.id ? "selected" : ""}`}
                onClick={() => handleSelect(todo.id)}>
              <span className='listItem'>{todo.text}</span>
              <div onClick={(e) => e.stopPropagation()} className="h-6 w-6 mr-3"> {/* Prevent event propagation */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoComplete(todo.id)}
                  className=" align-middle h-7 w-7 accent-green-900"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <ClearListButton onClear={clearTodos} isTodoCompleted={todos.some(todo => todo.completed)} />
    </main>
  );
};

export default Page;
