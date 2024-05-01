import React, { useState, useRef, useEffect } from "react";
import { TodoItemProps } from "@/components/models/interface";

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    selectedId,
    setSelectedId,
    updateTodo,
    className,
    onEditingStateChange
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 編集状態が変更されたときのみフォーカスを管理
        if (isEditing) {
            textRef.current?.focus();
        } else if (textRef.current) {
            textRef.current.blur();
        }
    }, [isEditing]);

    const handleBlur = () => {
        if (isEditing && textRef.current?.textContent) {
            updateTodo(todo.id, textRef.current.textContent);
            setIsEditing(false);
            onEditingStateChange(false);
            setSelectedId(null);  // 編集終了後に選択状態を解除
        }
    };

    const handleClick = () => {
        if (selectedId === todo.id && !isEditing) {
            setIsEditing(true);
            onEditingStateChange(true);
        } else if (selectedId !== todo.id) {
            setSelectedId(todo.id);
            onEditingStateChange(true);
        }
    };

    return (
        <div
            ref={textRef}
            onClick={handleClick}
            onBlur={handleBlur}
            contentEditable={isEditing}
            suppressContentEditableWarning
            className={`flex-grow flex-shrink min-w-0 cursor-pointer ${className} ${isEditing ? 'editing' : ''}`}
            style={{ outline: isEditing ? 'none' : 'none' }}
        >
            {todo.text}
        </div>
    );
};

export default TodoItem;
