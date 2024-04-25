import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Todo } from "@/components/models/interface";
import useDropTodo from "@/components/client/hooks/useDropTodo";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedId: number | null;
  handleSelect: (id: number) => void;
  toggleTodoComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  selectedId,
  handleSelect,
  toggleTodoComplete,
}) => {
  const { onDragEnd } = useDropTodo(todos, setTodos);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                    {...provided.dragHandleProps}
                    className={`Todolist flex justify-between items-center ${
                      snapshot.isDragging ? "dragging" : ""
                    } ${selectedId === todo.id ? "selected" : ""}`}
                    onClick={() => handleSelect(todo.id)}
                  >
                    <span className="listItem">{todo.text}</span>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="h-6 w-6 mr-3"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoComplete(todo.id)}
                        className="h-7 w-7 accent-green-700"
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
