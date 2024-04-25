// src/components/client/ui/ClearListButton.client.tsx
import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { useTodoContext } from "../context/TodoContext";
import { ClearListButtonProps } from "@/components/models/interface";

const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deletedItems, setDeletedItems } = useTodoContext();

  const clearTodos = (onlyCompleted: boolean) => {
    if (onlyCompleted) {
      // 完了したタスクのみを削除
      const completedTodos = todos.filter(todo => todo.completed);
      setDeletedItems([...deletedItems, ...completedTodos]);
      setTodos(todos.filter(todo => !todo.completed));
    } else {
      // 全タスクを削除
      setDeletedItems([...deletedItems, ...todos]);
      setTodos([]);
    }
    setIsModalOpen(false);
  };

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
        className="fixed bottom-4 right-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
      >
        <Image src={getImageSrc()} alt="Delete" width={27} height={27} priority />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="リストを全削除しますか？"
        confirmText="削除"
        cancelText="キャンセル"
      >
        <span></span>
      </Modal>
    </>
  );
};

export default ClearListButton;
