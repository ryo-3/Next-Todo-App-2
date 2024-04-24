import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Todo } from "../../models/interface";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";

function useTodoManagement(
  inputValue: string,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);  // ローディング状態を管理するためのステートを追加

  useEffect(() => {
    // 仮のデータフェッチまたは初期化処理を想定
    setTimeout(() => {
      setLoading(false);  // データフェッチが完了したらローディングをfalseに
    }, 200);
  }, []);

  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);
  const { validateInput, error } = useInputValidation(
    (value: string) => value.trim().length > 0,
    inputValue
  );
  const { handleSubmit } = useHandleSubmit(
    validateInput,
    createTodo,
    updateTodos
  );

  const handleSelect = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const toggleTodoComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return { handleSubmit, handleSelect, toggleTodoComplete, selectedId, error, loading };
}

export default useTodoManagement;