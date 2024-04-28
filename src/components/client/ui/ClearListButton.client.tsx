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
<<<<<<< HEAD
    if (onlyCompleted) {
      // 1. 完了したタスクのみをフィルタリングして新しい配列を作成
      const completedTodos = todos.filter((todo) => todo.completed);

      // 2. 完了したタスクの各アイテムについて、そのアイテムと元のリストでのインデックスを記録
      const newDeletedItems = completedTodos.map((todo) => ({
        item: todo,
        deletedIndex: todos.indexOf(todo),
      }));

      // 3. 削除されるタスクをdeletedItemsリストに追加
      setDeletedItems([...deletedItems, ...newDeletedItems]);

      // 4. 完了していないタスクだけを残してtodosリストを更新
      setTodos(todos.filter((todo) => !todo.completed));

      // 5. ログに完了したタスクの詳細を出力
      newDeletedItems.forEach((deletedItem) => {
        console.log(
          `選択削除されたアイテム="${deletedItem.item.text}", Index=${deletedItem.deletedIndex}`
        );
      });
    } else {
      // 1. 全タスクの各アイテムについて、そのアイテムと元のリストでのインデックスを記録
      const allDeletedItems = todos.map((todo) => ({
        item: todo,
        deletedIndex: todos.indexOf(todo),
      }));

      // 2. 削除される全タスクをdeletedItemsリストに追加
      setDeletedItems([...deletedItems, ...allDeletedItems]);

      // 3. todosリストを空にして全タスクを削除
      setTodos([]);

      // 4. ログに全タスクの詳細を出力
      allDeletedItems.forEach((deletedItem) => {
        console.log(
          `全削除されたアイテム="${deletedItem.item.text}", Index=${deletedItem.deletedIndex}`
        );
      });
    }
    // 5. モーダルを閉じる
=======
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

>>>>>>> main
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
