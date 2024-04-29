// src/components/client/ui/ClearListButton.client.tsx
import React, { useEffect } from "react";
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
}) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
  const { isModalOpen, openModal, closeModal, setIsModalOpen } =
    useClearButtonModal();

  const { undoStack, setUndoStack } = useUndoStack();

  const clearTodos = (onlyCompleted: boolean) => {
    // onlyCompletedがtrueの場合は完了したTODOのみ、falseの場合は全TODOを対象とする
    const targetTodos = onlyCompleted
      ? todos.filter((todo) => todo.completed)
      : [...todos];
    // 対象のTODOから削除アイテムリストを生成（各アイテムに対して元のインデックスを記録）
    const newDeletedItems = targetTodos.map((todo) => ({
      item: todo,
      deletedIndex: todos.indexOf(todo),
    }));

    // 対象のTODOを除外してTODOリストを更新
    setTodos(todos.filter((todo) => !targetTodos.includes(todo)));


    setDeletedItems(prev => {
    const updatedDeletedItems = [...prev, ...newDeletedItems];
    console.log("削除アイテムを追加:", JSON.stringify(updatedDeletedItems, null, 2)); // ログに新しい削除アイテムリストを出力
    return updatedDeletedItems;
  });


    // Undoスタックに新しい削除操作を追加
    setUndoStack((prev) => [
      ...prev,
      { type: onlyCompleted ? "partial" : "full", items: newDeletedItems },
    ]);
    // スタック更新後の状態をログに出力（デバッグ用）
    // console.log(
    //   "スタックにプッシュ後の更新されたスタック:",
    //   JSON.stringify(undoStack, null, 2)
    // );

    // モーダルを閉じる
    setIsModalOpen(false);
  };

  // Undoスタックの変更を監視し、変更があるたびにログ出力
  //   useEffect(() => {
  //     console.log("現在のスタックの更新:", JSON.stringify(undoStack, null, 2));
  //   }, [undoStack]);

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
