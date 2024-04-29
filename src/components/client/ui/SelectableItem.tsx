import { TodoItem } from "@/components/models/interface";
import React, { useState } from "react";

interface SelectableItemProps {
  todo: TodoItem;
  selectedId: number | null; // selectedIdをPropsに追加
  updateTodo: (id: number, newText: string) => void;
  className?: string;  
}

const SelectableItem: React.FC<SelectableItemProps> = ({
    todo,
    selectedId,
    updateTodo,
    className
  }) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const handleBlur = () => {
      if (isEditing) {
        updateTodo(todo.id, todo.text);
        setIsEditing(false);
      }
    };
  
    const handleClick = () => {
      setIsEditing(true);
    };
  
    return (
      <div
        onClick={handleClick}
        onBlur={handleBlur}
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="flex-grow flex-shrink min-w-0 cursor-pointe"
        style={{ outline: isEditing ? 'none' : 'none' }}
      >
        {todo.text}
      </div>
    );
  };

  

export default  SelectableItem;