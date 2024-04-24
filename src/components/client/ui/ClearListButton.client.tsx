import React, { useState } from "react";
import Image from "next/image";
import { ClearListButtonProps } from "@/components/models/interface";
import Modal from "./Modal";


const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearTodos = (onlyCompleted: boolean) => {
    if (onlyCompleted) {
      const filteredTodos = todos.filter((todo) => !todo.completed);
      setTodos(filteredTodos);
    } else {
      setTodos([]);
    }
  };

  const handleClear = () => {
    if (isTodoCompleted) {
      clearTodos(true); // 選択したリストを削除する場合はモーダルを表示せずに削除
    } else {
      setIsModalOpen(true); // リストを全て削除する場合はモーダルを表示
    }
  };

  const handleConfirm = () => {
    clearTodos(false);
    setIsModalOpen(false);
  };

  const getImageSrc = () => {
    return "/DeleteButton.png";
  };

  return (
    <>
      <button
        onClick={handleClear}
        className="fixed bottom-4 right-4 bg-white w-12 h-12 border border-stone-300 rounded-full flex justify-center items-center"
      >
        <Image src={getImageSrc()} alt="削除" width={27} height={27} priority />
      </button>
      <Modal isOpen={!isTodoCompleted && isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>リストを全て削除しますか？</p>
        <div className="flex justify-center mt-3">
          <button
            className="px-4 py-3 bg-gray-200 rounded-md mr-5"
            onClick={() => setIsModalOpen(false)}
          >
            キャンセル
          </button>
          <button
            className="px-4 py-2 Bg-brown text-white rounded-md"
            onClick={handleConfirm}
          >
            削除
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ClearListButton;