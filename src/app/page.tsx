// page.tsx
"use client";
import React, { useState } from "react";
import Header from "./page-parts/Header.client";
import Main from "./page-parts/Main.client";
import Footer from "./page-parts/Footer.client";
import { Todo } from "@/components/models/interface";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="w-full bg-green-50">
      <Header />
      <Main todos={todos} setTodos={setTodos} />
      <Footer todos={todos} setTodos={setTodos} />
    </div>
  );
}