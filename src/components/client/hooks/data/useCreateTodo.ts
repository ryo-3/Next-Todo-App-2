// 新しいTodoオブジェクト作成
"use client";

import { Todo } from "@/components/models/interface";

const useCreateTodo = (inputValue: string) => {
  const createTodo = (): Todo => {
    return {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      order: 0 
    };
  };

  return { createTodo };
};

export default useCreateTodo;