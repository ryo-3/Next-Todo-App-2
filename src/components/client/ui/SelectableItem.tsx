import React, { useState, useEffect } from "react";
import { TodoItem } from "@/components/models/interface";

interface SelectableItemProps {
  todo: TodoItem;
  selectedId: number | null;
  updateTodo: (id: number, newText: string) => void;
  className?: string;
  onFocusChange: (focused: boolean) => void; // フォーカス状態の変更を通知するためのプロップス
}

const SelectableItem: React.FC<SelectableItemProps> = ({
  todo,
  selectedId,
  updateTodo,
  className,
  onFocusChange
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    updateTodo(todo.id, todo.text);
    setIsEditing(false);
    onFocusChange(false); // フォーカスが外れたことを通知
  };

  const handleClick = () => {
    setIsEditing(true);
    onFocusChange(true); // フォーカスが設定されたことを通知
  };

  return (
    <div
      tabIndex={0} // フォーカス可能にする
      onClick={handleClick}
      onBlur={handleBlur}
      contentEditable={isEditing}
      suppressContentEditableWarning
      className={`flex-grow flex-shrink min-w-0 cursor-pointer ${className}`}
      style={{ outline: isEditing ? 'none' : 'none' }}
    >
      {todo.text}
    </div>
  );
};

export default SelectableItem;
