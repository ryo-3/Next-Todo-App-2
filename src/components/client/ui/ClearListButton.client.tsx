// src/components/client/ui/ClearListButton.client.tsx
// src/components/client/ui/ClearListButton.client.tsx
import React from "react";
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
    const { isModalOpen, openModal, closeModal, setIsModalOpen } = useClearButtonModal();


  const clearTodos = (onlyCompleted: boolean) => {
    if (onlyCompleted) {
      // 完了したタスクのみを削除

      // 完了しているtodosを抽出
      const completedTodos = todos.filter((todo) => todo.completed);
      // 削除するアイテムをdeletedItems用の形式で新しい配列として作成
      const newDeletedItems = completedTodos.map((item, index) => ({
        item,
        // 削除されたアイテムの位置を指定（現状だとdeletedItemsの長さを使うことで正確な位置が不明瞭になる）
        deletedIndex: deletedItems.length + index, // 修正：indexを加算して正確な位置を保持
      }));
      // 更新されたdeletedItemsを設定
      setDeletedItems([...deletedItems, ...newDeletedItems]);
      // 完了しているタスクを除外したtodosをセット
      setTodos(todos.filter((todo) => !todo.completed));
    } else {
      // 全タスクを削除
      // 全てのtodosを削除するためのdeletedItems用の配列を作成
      const newDeletedItems = todos.map((item, index) => ({
        item,
        deletedIndex: index, // 各アイテムの正確なインデックスを記録
      }));
      // 更新されたdeletedItemsを設定
      setDeletedItems([...deletedItems, ...newDeletedItems]);
      // todosを空の配列で更新
      setTodos([]);
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