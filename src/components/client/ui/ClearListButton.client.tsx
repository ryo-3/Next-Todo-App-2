// src/components/client/ui/ClearListButton.client.tsx
import React, { useCallback, useState } from "react";
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
  const [iconActive, setIconActive] = useState(false);

  // アイコンのソースを管理する
  const getImageSrc = () => {
    return iconActive || isModalOpen
      ? "/DeleteButtonActive.png"
      : "/DeleteButton.png";
  };

  // 完了したタスクのみ削除
  const clearCompletedTodos = useCallback(() => {
    setIconActive(true); // アイコンをアクティブにする
    setTimeout(() => setIconActive(false), 700); 

    const completedTodos = todos.filter(
      (todo) => todo.completed && !pinnedIds.includes(todo.id)
    );
    setTodos(todos.filter((todo) => !completedTodos.includes(todo)));

    const deletedItemsToAdd = completedTodos.map((todo) => ({
      item: todo,
      deletedIndex: todos.indexOf(todo),
    }));
    setDeletedItems(deletedItemsToAdd);
    setUndoStack([{ type: "partial", items: deletedItemsToAdd }]);
  }, [todos, setTodos, setDeletedItems, setUndoStack, pinnedIds]);

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
      setIsModalOpen(true); // モーダルを表示
    }
  };

  return (
    <>
      <button
        onClick={handleClear}
        className="fixed bottom-4 right-4 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
      >
        <Image
          src={getImageSrc()}
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
