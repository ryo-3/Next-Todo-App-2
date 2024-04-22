// TodoForm.js
import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTodo({
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      });
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
  );
}
