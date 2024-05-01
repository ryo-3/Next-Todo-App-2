import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TodoListProps } from "@/components/models/interface";
import TodoItem from "./TodoItem"; //　リスト専用コンポーネントリストアイテムの使用

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  toggleTodoComplete,
  updateTodo,
  selectedId,
  handleSelect,
  onEditingStateChange,
  onDragEnd,
  pinnedIds,
  setSelectedId,
}) => {
  const handleItemClick = (id: number) => {
    if (selectedId !== id) {
      handleSelect(id);
    }
  };

  // TodoList コンポーネント内
  todos.sort((a, b) => {
    const aPinned = pinnedIds.includes(a.id);
    const bPinned = pinnedIds.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return a.order - b.order; // `order` は各 Todo アイテムの並び順を示すプロパティ
  });

  return (
    <DragDropContext onDragStart={() => {}} onDragEnd={onDragEnd}>
      <Droppable droppableId="todos-list" direction="vertical">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="pb-40 pt-5"
          >
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative flex-container pt-2 pb-2.5 pl-2 rounded-md mb-2 text-neutral-900 flex justify-between items-center draggable-bg-transition ${
                      snapshot.isDragging ? "bg-emerald-200" : "bg-emerald-100"
                    } ${selectedId === todo.id ? "bg-selected" : ""}`}
                    onClick={() => handleItemClick(todo.id)}
                  >
                    {pinnedIds.includes(todo.id) && (
                      <img
                        src="./pin.png"
                        alt="Pinned"
                        className="absolute pin"
                      />
                    )}
                    <div className="checkbox-custom">
                      <input
                        id={`checkbox-${todo.id}`}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoComplete(todo.id)}
                        className=""
                      />
                      <label htmlFor={`checkbox-${todo.id}`}></label>
                    </div>
                    <TodoItem
                       key={todo.id}
                       todo={todo}
                       selectedId={selectedId}
                       setSelectedId={setSelectedId}
                       updateTodo={updateTodo}
                       className="text-input flex-grow"
                       onEditingStateChange={onEditingStateChange}
                    />
                    <div
                      {...provided.dragHandleProps}
                      onClick={(e) => e.stopPropagation()}
                      className="pr-2.5 py-1 pl-1 flex-shrink-0"
                    >
                      <img
                        src="./seedling.png"
                        className="flex-shrink-0 w-5 h-5"
                        alt=""
                      />
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
