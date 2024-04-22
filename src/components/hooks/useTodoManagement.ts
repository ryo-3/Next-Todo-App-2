// hooks/useTodoManagement.js
import useCreateTodo from "./useCreateTodo";
import useUpdateTodos from "./useUpdateTodos";
import useHandleSubmit from "./useHandleSubmit";

function useTodoManagement(
  inputValue,
  todos,
  setTodos,
  handleChange,
  validateInput
) {
  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);
  const { handleSubmit } = useHandleSubmit(
    validateInput,
    createTodo,
    updateTodos
  );

  return { createTodo, updateTodos, handleSubmit };
}

export default useTodoManagement;
