import { Dispatch, SetStateAction } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Todo } from "@/components/models/interface"; // 仮定のパス

type SetTodos = Dispatch<SetStateAction<Todo[]>>;

const useDropTodo = (todos: Todo[], setTodos: SetTodos) => {
  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return { onDragEnd };
};

export default useDropTodo;