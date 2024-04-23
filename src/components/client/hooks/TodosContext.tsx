// src/contexts/TodosContext.js
"use client";
import React, { createContext, useState, useContext } from "react";

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
