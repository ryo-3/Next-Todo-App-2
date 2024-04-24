// useTodoManagement フック
"use client";
import { Dispatch, SetStateAction, useState } from "react";
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
      setSelectedId(id === selectedId ? null : id); // Toggle select/deselect
      console.log("Selected ID:", id); // コンソールログを追加
    };

    return { handleSubmit, handleSelect, selectedId, error };
}

export default useTodoManagement;
