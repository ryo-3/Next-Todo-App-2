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
  const [activeClass, setActiveClass] = useState("");

  const clearCompletedTodos = useCallback(() => {
      // 完了したタスクの削除ロジック
    setActiveClass("active-open");

    setTimeout(() => {
      setActiveClass("active-close");
    }, 1500);

    setTimeout(() => {
      setActiveClass("");
    }, 2200);

    const completedTodos = todos.filter((todo) => todo.completed);
    setTodos(todos.filter((todo) => !completedTodos.includes(todo)));

    const deletedItemsToAdd = completedTodos.map((todo) => ({
      item: todo,
      deletedIndex: todos.indexOf(todo),
    }));
    setDeletedItems([...deletedItems, ...deletedItemsToAdd]);
    setUndoStack([...undoStack, { type: "partial", items: deletedItemsToAdd }]);
  }, [todos, setTodos, deletedItems, setDeletedItems, undoStack, setUndoStack]);

  const handleClearTodos = useCallback(() => {
      // すべてのタスクを削除するロジック
    setActiveClass("active-open");
    setTimeout(() => {
      setActiveClass("active-close");
    }, 1500);

    setTimeout(() => {
      setActiveClass("");
    }, 2200);

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
          src="/DeleteButton.png"
          alt="Delete"
          width={32}
          height={32}
          priority
        />
        <Image
          src="/TrashLid.png"
          alt="蓋"
          width={22}
          height={22}
          priority
          className={`trashLid ${activeClass}`} // アニメーションのクラスを適用
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
        <p className="text-xs flex justify-end">
          ※ピン止めされたリストは削除されません。
        </p>
      </ClearButtonModal>
    </>
  );
};

export default ClearListButton;
