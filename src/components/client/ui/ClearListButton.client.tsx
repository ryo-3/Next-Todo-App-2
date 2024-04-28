// src/components/client/ui/ClearListButton.client.tsx
// src/components/client/ui/ClearListButton.client.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTodoContext } from "../context/TodoContext";
import { ClearListButtonProps, Todo } from "@/components/models/interface";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import ClearButtonModal from "./ClearButtonModal"; // 追加
import { useClearButtonModal } from "../hooks/useClearButtonModal";
import { useUndoStack } from "../context/UndoStackContext";

const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted,
}) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
  const { isModalOpen, openModal, closeModal, setIsModalOpen } =
    useClearButtonModal();

    const { undoStack, setUndoStack } = useUndoStack();

  const clearTodos = (onlyCompleted: boolean) => {
    const targetTodos = onlyCompleted ? todos.filter(todo => todo.completed) : [...todos];
    const newDeletedItems = targetTodos.map(todo => ({
      item: todo,
      deletedIndex: todos.indexOf(todo),
    }));
  
    setTodos(todos.filter(todo => !targetTodos.includes(todo)));
    setDeletedItems(prev => [...prev, ...newDeletedItems]);
    setUndoStack(prev => [
      ...prev,
      { type: onlyCompleted ? "partial" : "full", items: newDeletedItems }
    ]);
    console.log("Updated stack after push:", JSON.stringify(undoStack, null, 2));

    setIsModalOpen(false);
  };
  
  useEffect(() => {
    console.log("Current stack updated:", JSON.stringify(undoStack, null, 2));
  }, [undoStack]);
  
  

  const handleClear = () => {
    if (isTodoCompleted) {
      // 完了したタスクがある場合はモーダルなしで削除
      clearTodos(true);
    } else {
      // 完了したタスクがない場合はモーダルを表示して全削除を確認
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => clearTodos(false);
  const getImageSrc = () => "/DeleteButton.png";

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
      <ClearButtonModal // 更新
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title="リストを全削除しますか？"
        confirmText="削除"
        cancelText="キャンセル"
      >
        <span></span>
      </ClearButtonModal>
    </>
  );
};

export default ClearListButton;
