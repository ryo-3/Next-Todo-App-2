import React, { useState, useEffect } from "react";
import { Todo } from "@/components/models/interface";


interface TodoItemProps {
    todo: Todo;
    selectedId: number | null;
    updateTodo: (id: number, newText: string) => void;
    className?: string;
    onEditingStateChange: (isFocused: boolean) => void; // プロパティ名を修正
  }
  
  const TodoItem: React.FC<TodoItemProps> = ({
      todo,
      selectedId,
      updateTodo,
      className,
      onEditingStateChange  // ここを修正
    }) => {
      const [isEditing, setIsEditing] = useState(false);
  
      const handleBlur = () => {
        if (isEditing) {
          updateTodo(todo.id, todo.text);
          setIsEditing(false);
          onEditingStateChange(false);  // 編集が終わったことを通知
        }
      };
  
      const handleClick = () => {
        setIsEditing(true);
        onEditingStateChange(true);  // 編集が始まったことを通知
      };
  
      return (
        <div
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