// src/components/client/ui/ClearListButton.client.tsx
// src/components/client/ui/ClearListButton.client.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useTodoContext } from "../context/TodoContext";
import { ClearListButtonProps } from "@/components/models/interface";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import ClearButtonModal from "./ClearButtonModal"; // 追加
import { useClearButtonModal } from "../hooks/useClearButtonModal";

const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted,
}) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
  const { isModalOpen, openModal, closeModal, setIsModalOpen } =
    useClearButtonModal();
  const [undoStack, setUndoStack] = useState([]); // 操作履歴をスタックで管理

  const clearTodos = (onlyCompleted: boolean) => {
    // 完了しているタスクだけ
    if (onlyCompleted) {
      // 完了しているタスクをフィルタリングして抽出
      const completedTodos = todos.filter((todo) => todo.completed);
      // 抽出した完了タスクに対して削除アイテムの形式を作成し、各タスクの元のインデックスを記録
      const newDeletedItems = completedTodos.map((item) => ({
        item,
        deletedIndex: todos.findIndex((t) => t === item), // 元の位置を正確に記録
      }));
      // 削除アイテムリストに新しい削除アイテムを追加
      setDeletedItems([...deletedItems, ...newDeletedItems]);
      // todosから完了タスクを削除
      setTodos(todos.filter((todo) => !todo.completed));
      // 削除されたアイテムをログに出力
      console.log("Deleted completed items:", completedTodos);
    } else {
      // 全てのタスクを削除アイテムの形式に変換し、各タスクの元のインデックスを記録
      const newDeletedItems = todos.map((item, index) => ({
        item,
        deletedIndex: index, // 各アイテムの正確なインデックスを記録
      }));
      // 削除アイテムリストに新しい削除アイテムを追加
      setDeletedItems([...deletedItems, ...newDeletedItems]);
      // todosを空の配列で更新し、全タスクを削除
      setTodos([]);
      // 削除されたアイテムをログに出力
      console.log("Deleted all items:", todos);
    }
    // モーダルを閉じる
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
