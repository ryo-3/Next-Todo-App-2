import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TodoListProps } from "@/components/models/interface";
import TodoItem from "./TodoItem";

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
  setPinnedIds,
}) => {
  const handleItemClick = (id: number) => {
    if (selectedId !== id) {
      handleSelect(id);
    }
  };

  const [pinAnimation, setPinAnimation] = useState<{ [key: number]: string }>({});
  const initialLoad = useRef(true); // 初回ロードフラグ

  useEffect(() => {
    todos.forEach((todo) => {
      const isPinned = pinnedIds.includes(todo.id);
      let animationClass = "hidden"; // デフォルトでは非表示
      if (isPinned) {
        animationClass = "pin-activate-animation";
      } else if (!initialLoad.current) {
        animationClass = "";
      }

      setPinAnimation((prev) => ({
        ...prev,
        [todo.id]: animationClass,
      }));
    });
    initialLoad.current = false; // 初期ロードが終了したらフラグを更新
  }, [todos, pinnedIds]);

  const togglePin = (id: number) => {
    const isPinned = pinnedIds.includes(id);
    if (isPinned) {
      setPinAnimation((prev) => ({
        ...prev,
        [id]: "pin-deactivate-animation",
      }));

      // アニメーションの完了を待つ
      setTimeout(() => {
        setPinnedIds(pinnedIds.filter((pinnedId) => pinnedId !== id));
        setPinAnimation((prev) => ({
          ...prev,
          [id]: "hidden", // アニメーション終了後に非表示にする
        }));
      }, 800);
    } else {
      setPinAnimation((prev) => ({
        ...prev,
        [id]: "pin-activate-animation",
      }));

      setPinnedIds([...pinnedIds, id]);
    }
  };

  todos.sort((a, b) => {
    const aPinned = pinnedIds.includes(a.id);
    const bPinned = pinnedIds.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return a.order - b.order;
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
                    <div onClick={() => togglePin(todo.id)}>
                      {pinAnimation[todo.id] !== "hidden" && (
                        <img
                          src="./pin.png"
                          alt="Pinned"
                          className={`absolute pin ${pinAnimation[todo.id]}`}
                        />
                      )}
                    </div>

                    <div className="checkbox-custom">
                      <input
                        id={`checkbox-${todo.id}`}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoComplete(todo.id)}
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
