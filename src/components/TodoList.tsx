import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
  return (
    <ul className="list-disc pl-5">
      {todos.map((todo) => (
        <TodoItem key={todo.id.toString()} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
