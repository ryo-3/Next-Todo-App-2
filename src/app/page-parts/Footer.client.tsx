// Footer.client.tsx
"use client";
import React from "react";
import ClearListButton from "@/components/ClearListButton.client";
import { Todo } from "@/components/models/interface";

interface FooterProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Footer: React.FC<FooterProps> = ({ todos, setTodos }) => {
  const clearTodos = () => setTodos([]);

  return (
    <footer>
      <nav>
        <ClearListButton onClear={clearTodos} />
      </nav>
    </footer>
  );
};

export default Footer;