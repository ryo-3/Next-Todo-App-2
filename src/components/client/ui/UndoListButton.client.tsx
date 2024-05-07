// src/components/client/ui/UndoListButton.client.tsx
import React from "react";
import Image from "next/image";
import { useDeletedItemContext } from "../context/DeletedItemContext";
import { UndoListButtonProps } from "@/components/models/interface";
import { useUndoStack } from "../context/UndoStackContext";

const UndoListButton: React.FC<UndoListButtonProps> = ({ todos, setTodos }) => {
  const { deletedItems, setDeletedItems } = useDeletedItemContext();
  const { undoStack, setUndoStack } = useUndoStack();

  const undoRemoval = () => {
    // スタックが空の場合、操作を中断
    if (undoStack.length === 0) return;

    // 最後の操作を取得
    const lastAction = undoStack[undoStack.length - 1];
    if (!lastAction) return;

    // 元に戻すために現在のTODOリストのコピーを作成
    const restoredTodos = [...todos];
    // 最後の操作に含まれる各アイテムをTODOリストに再挿入
    lastAction.items.forEach(({ item, deletedIndex }) => {
      console.log(`インデックス ${deletedIndex} にアイテムを復元中:`, item);
      restoredTodos.splice(deletedIndex, 0, item);
    });

    // 復元後のTODOリストを状態にセット
    setTodos(restoredTodos);
    // 復元操作によって不要になった削除アイテムを削除リストから除外
    setDeletedItems((prev) =>
      prev.filter(
        (delItem) =>
          !lastAction.items.some(
            (actionItem) => actionItem.item === delItem.item
          )
      )
    );
    // 最後の操作をスタックから削除
    setUndoStack((prev) => [...prev.slice(0, -1)]);
  };

  return (
    <button
      onClick={undoRemoval}
      className="fixed bottom-4 right-20 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image
        src="/UndoButton.png"
        alt="削除"
        width={32}
        height={32}
        priority
      />
    </button>
  );
};

export default UndoListButton;
