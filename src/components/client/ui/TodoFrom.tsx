import React from "react";

interface TodoFormProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
}

const TodoForm: React.FC<TodoFormProps> = ({
  inputValue,
  handleChange,
  handleSubmit,
  error,
}) => {
  return (
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
  );
};

export default TodoForm;
