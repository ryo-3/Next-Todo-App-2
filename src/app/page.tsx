// Home.client.tsx
"use client";
import React from "react";
import Header from "./page-parts/Header";
import Main from "./page-parts/Main";
import Footer from "./page-parts/Footer";
import { Todo } from "@/components/models/interface";
import useLocalStorage from "@/components/client/hooks/useLocalStorage";

const Home: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const clearTodos = () => setTodos([]);

  return (
    <div className="w-full bg-green-50">
      <Header />
      <Main todos={todos} setTodos={setTodos} />
      <Footer clearTodos={clearTodos} /> {/* clearTodos 関数を渡す */}
    </div>
  );
};

export default Home;
