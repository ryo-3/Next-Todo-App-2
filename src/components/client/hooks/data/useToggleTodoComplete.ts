// Todo完了状態の切り替え
import { Todo } from "../../../models/interface";

const useToggleTodoComplete = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const toggleTodoComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return { toggleTodoComplete };
};

export default useToggleTodoComplete;
