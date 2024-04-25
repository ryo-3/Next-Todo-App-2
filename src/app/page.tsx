"use client";
import React from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import useScrollFixed from "@/components/client/hooks/useScrollFixed";
import useDropTodo from "@/components/client/hooks/useDropTodo";
import { TodoProvider } from "@/components/client/context/TodoContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";

const Page = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
    handleSubmit,
    error,
    handleSelect,
    selectedId,
    toggleTodoComplete,
    loading,
    removeItem,
  } = useTodoManagement();
  const { placeholderStyle, formRef, fixedStyle } = useScrollFixed();
  const { onDragEnd } = useDropTodo(todos, setTodos);

  return (
    <TodoProvider>
      <main>
        <div style={placeholderStyle}></div>
        <div ref={formRef} style={fixedStyle}>
          <form
            onSubmit={handleSubmit}
            className="relative flex justify-between smd:justify-start w-full"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="入力欄 ..."
              className="border-2 py-2 pl-3 rounded mr-2 w-9/12 focus:outline-none focus:border-yellow-950"
            />
            {error && <div className="error">{error}</div>}
            <button
              type="submit"
              className="bg-emerald-600 text-white font-bold py-2 px-3.5 rounded ss:px-4"
            >
              追加
            </button>
          </form>
        </div>
        {loading ? (
          <div className="text-stone-500">リスト読み込み中...</div>
        ) : (
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
        )}
        <ClearListButton
          todos={todos}
          setTodos={setTodos}
          isTodoCompleted={todos.some((todo) => todo.completed)}
        />
        <UndoListButton
          todos={todos}
          setTodos={setTodos}
          removeItem={removeItem}
        />
      </main>
    </TodoProvider>
  );
};

export default Page;