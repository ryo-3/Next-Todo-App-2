import { Todo } from "@/components/models/interface";

const useHandleSubmit = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  inputValue: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  validateInput: () => boolean
) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput() && inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      handleChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return { handleSubmit };
};

export default useHandleSubmit;
