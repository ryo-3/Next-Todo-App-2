// リスト専用コンポーネント　リストアイテム　編集と保存の機能
import React, { useState, useRef, useEffect } from "react";
import { TodoItemProps } from "@/components/models/interface";


const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  selectedId,
  updateTodo,
  className,
  onEditingStateChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    if (isEditing && textRef.current) {
      const newText = textRef.current.textContent || "";  // contentEditableから新しいテキストを取得
      updateTodo(todo.id, newText);  // 新しいテキストを使って更新
      setIsEditing(false);
      onEditingStateChange(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    onEditingStateChange(true);
  };

  return (
    <div
      ref={textRef}
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

export default TodoItem;
