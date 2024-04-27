// src/components/client/ui/UndoListButton.client.tsx
import React from "react";
import { useTodoContext } from "../context/TodoContext";
import { UndoListButtonProps } from "@/components/models/interface";
import Image from "next/image";

const UndoListButton: React.FC = () => {
    const { deletedItems, setDeletedItems, todos, setTodos } = useTodoContext();
  
    const undoRemoval = () => {
        // deletedItemsの長さが0より大きい場合、つまり削除されたアイテムがある場合
        if (deletedItems.length > 0) {
          // deletedItemsの最後のアイテムを取得し、lastItemとdeletedIndexに代入
          const { item: lastItem, deletedIndex } = deletedItems[deletedItems.length - 1];
          
          // deletedItemsから最後のアイテムを除いた新しい配列を作成
          const updatedDeletedItems = deletedItems.slice(0, deletedItems.length - 1);
          
          // updatedDeletedItemsをsetDeletedItemsを使ってstateに反映
          setDeletedItems(updatedDeletedItems);
          
          // todosを複製し、newTodosに代入
          const newTodos = [...todos];
          
          // newTodosの指定したインデックス(deletedIndex)の位置にlastItemを挿入
          newTodos.splice(deletedIndex, 0, lastItem);
          
          // newTodosをsetTodosを使ってstateに反映
          setTodos(newTodos);
          
          // ログにアイテムの復元に関する情報を出力
          console.log(`ごみ箱から出そうとしているアイテム＝"${lastItem.text}" 所持していたindex番号 ${deletedIndex}`);
        }
      };

  return (
    <button
      onClick={undoRemoval} // Propから受け取ったonClickを使用
      className="fixed bottom-4 right-20 bg-white w-14 h-14 border border-stone-300 rounded-full flex justify-center items-center"
    >
      <Image
        src={"/DeleteButtonUp.png"}
        alt="削除"
        width={32}
        height={32}
        priority
      />
    </button>
  );
};

export default UndoListButton;
