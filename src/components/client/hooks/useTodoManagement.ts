import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Todo } from "../../models/interface";
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useInputValidation from "./useInputValidation";
import useHandleSubmit from "./useHandleSubmit";
import useLocalStorage from "./useLocalStorage"; // useLocalStorage をインポート

function useTodoManagement(
  inputValue: string,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
) {
  // useLocalStorage フックを使用して todos と setTodos を取得
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // データフェッチまたは初期化処理
    setTimeout(() => {
      setLoading(false);
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

  // todos と setTodos を返すことで、これらの値をコンポーネントで使用できるようにする
  return { todos, setTodos, handleSubmit, handleSelect, toggleTodoComplete, selectedId, error, loading };
}

export default useTodoManagement;