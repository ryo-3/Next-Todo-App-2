// Footer.client.tsx
"use client";
import React from "react";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import { Todo } from "@/components/models/interface";

interface FooterProps {
    clearTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // この関数をプロップスとして受け取る
  }
  
  const Footer: React.FC<FooterProps> = ({ clearTodos }) => {
  return (
    <footer>
      <nav>
      <ClearListButton onClear={() => clearTodos([])} />
      </nav>
    </footer>
  );
};

export default Footer;
