// src/components/client/ui/ClearListButton.client.tsx
import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { useTodoContext } from "../context/TodoContext";
import { ClearListButtonProps } from "@/components/models/interface";

const ClearListButton: React.FC<ClearListButtonProps> = ({
  todos,
  setTodos,
  isTodoCompleted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deletedItems, setDeletedItems } = useTodoContext();

  const clearTodos = (onlyCompleted: boolean) => {
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
