import { useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { Todo } from "@/components/models/interface";

const useDropTodo = (todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }, [todos, setTodos]);

  return { onDragEnd };
};

export default useDropTodo;