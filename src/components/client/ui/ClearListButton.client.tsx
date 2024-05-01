// src/components/client/ui/ClearListButton.client.tsx
import React, { useCallback } from "react";
import Image from "next/image";
import { ClearListButtonProps } from "@/components/models/interface";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import { useClearButtonModal } from "../hooks/UIhooks/useClearButtonModal";
import { useUndoStack } from "../context/UndoStackContext";
import ClearButtonModal from "./ClearButtonModal";

const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted,
  pinnedIds,
}) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
  const { isModalOpen, setIsModalOpen } = useClearButtonModal();
  const { undoStack, setUndoStack } = useUndoStack();

  // 完了したタスクのみ削除（ピン止め状態を無視）
  const clearCompletedTodos = useCallback(() => {
    const completedTodos = todos.filter((todo) => todo.completed);
    setTodos(todos.filter((todo) => !completedTodos.includes(todo)));

    const deletedItemsToAdd = completedTodos.map((todo) => ({
      item: todo,
      deletedIndex: todos.indexOf(todo),
    }));
    setDeletedItems([...deletedItems, ...deletedItemsToAdd]);
    setUndoStack([...undoStack, { type: "partial", items: deletedItemsToAdd }]);
  }, [todos, setTodos, deletedItems, setDeletedItems, undoStack, setUndoStack]);

  // 全てのタスクを削除（ピン止めされていないもののみ）
  const handleClearTodos = useCallback(() => {
    const deletableTodos = todos.filter((todo) => !pinnedIds.includes(todo.id));
    setTodos(todos.filter((todo) => pinnedIds.includes(todo.id)));

    const deletedItemsToAdd = deletableTodos.map((todo) => ({
      item: todo,
      deletedIndex: todos.indexOf(todo),
    }));
    setDeletedItems([...deletedItems, ...deletedItemsToAdd]);
    setUndoStack([...undoStack, { type: "full", items: deletedItemsToAdd }]);
  }, [
    todos,
    setTodos,
    pinnedIds,
    deletedItems,
    setDeletedItems,
    undoStack,
    setUndoStack,
  ]);

  const handleConfirm = () => {
    handleClearTodos();
    setIsModalOpen(false);
  };

  const handleClear = () => {
    if (isTodoCompleted) {
      clearCompletedTodos();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClear}
        className="fixed bottom-4 right-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
      >
        <Image
          src="/DeleteButton.png"
          alt="Delete"
          width={32}
          height={32}
          priority
        />
      </button>
      <ClearButtonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="全てのリストを削除しますか？"
        confirmText="削除"
        cancelText="キャンセル"
      >
        <p className=" text-xs flex justify-end">
          ※ピン止めされたリストは削除されません。
        </p>
      </ClearButtonModal>
    </>
  );
};

export default ClearListButton;
