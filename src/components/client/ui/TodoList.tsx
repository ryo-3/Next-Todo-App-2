import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TodoListProps } from "@/components/models/interface";
import useDropTodo from "@/components/client/hooks/useDropTodo";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  selectedId,
  handleSelect,
  toggleTodoComplete,
  index,
}) => {
  const { onDragEnd } = useDropTodo(todos, setTodos);
  
  

  return (
    <DragDropContext onDragStart={() => {}} onDragEnd={onDragEnd}>
      <Droppable droppableId="todos-list" direction="vertical">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="pb-20 pt-5"
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
                    className={`pt-2 pb-2.5 pl-2 rounded-md mb-2 text-neutral-900 flex justify-between items-center draggable-bg-transition ${
                      snapshot.isDragging ? "bg-emerald-200 " : "bg-emerald-100"
                    } ${selectedId === todo.id ? "selected" : ""}`}
                    onClick={() => handleSelect(todo.id)}
                  >
                    <div className="checkbox-custom">
                      <input
                        id={`checkbox-${todo.id}`} // チェックボタン
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoComplete(todo.id)}
                        className="h-5 w-5 accent-green-700 mr-2"
                      />
                      <label htmlFor={`checkbox-${todo.id}`}></label>
                    </div>
                    <span className="listItem">{index + 1}. {todo.text}</span>
                    {/* ドラッグハンドルとして機能するアイコンボタン */}
                    <div
                      {...provided.dragHandleProps} // ドラッグハンドルのプロパティを適用
                      onClick={(e) => e.stopPropagation()} // イベントのバブリングを停止
                      className="flex items-center justify-center w-8 h-8 pt-1 pr-3"
                    >
                      <img src="./seedling.png" alt="" />
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
