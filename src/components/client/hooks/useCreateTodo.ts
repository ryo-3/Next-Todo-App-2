// 新しいTodoオブジェクト作成
"use client";
import { Todo } from '@/components/models/interface';

const useCreateTodo = (inputValue: string, index: number) => {
  const createTodo = (): Todo => {
    return {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      index: index, // インデックス番号を追加
    };
  };

  return { createTodo };
};

export default useCreateTodo;