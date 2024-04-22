// 新しいTodoオブジェクト作成
import { Todo } from '@/components/models/interface';

const useCreateTodo = (inputValue: string) => {
  const createTodo = (): Todo => {
    return {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
  };

  return { createTodo };
};

export default useCreateTodo;