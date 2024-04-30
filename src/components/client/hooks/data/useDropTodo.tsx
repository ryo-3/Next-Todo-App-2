import { useCallback, Dispatch, SetStateAction } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { Todo } from "@/components/models/interface";

interface UseDropTodo {
  onDragEnd: (result: DropResult) => void;
}

const useDropTodo = (
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  pinnedIds: number[],
  setPinnedIds: Dispatch<SetStateAction<number[]>>
): UseDropTodo => {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const items = Array.from(todos);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setTodos(items);

      // ピン留めの状態を更新する
      const isPinned = pinnedIds.includes(reorderedItem.id);
      const newPinnedIds = [...pinnedIds];
      const oldIndex = newPinnedIds.indexOf(reorderedItem.id);
      if (oldIndex !== -1) {
        newPinnedIds.splice(oldIndex, 1);
      }
      if (isPinned) {
        newPinnedIds.splice(result.destination.index, 0, reorderedItem.id);
      }
      setPinnedIds(newPinnedIds);
    },
    [todos, setTodos, pinnedIds, setPinnedIds]
  );

  return { onDragEnd };
};

export default useDropTodo;
