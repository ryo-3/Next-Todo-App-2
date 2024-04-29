import React from "react";

interface TodoFormProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  showForm: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  fixedStyle?: React.CSSProperties;
  formRef?: React.RefObject<HTMLDivElement>;
}

const TodoForm: React.FC<TodoFormProps> = ({
  inputValue,
  handleChange,
  handleSubmit,
  error,
  showForm,
  inputRef,
  fixedStyle,
  formRef,
}) => {
  const handleSubmitWithFocus: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    handleSubmit(event);
    inputRef.current?.focus();
  };

  return (
    <div ref={formRef} style={fixedStyle} className="">
        <form onSubmit={handleSubmitWithFocus} className="">
          <div className="relative flex items-center ">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="入力欄 ..."
              className="border-2 py-2 pl-3 rounded focus:outline-none focus:border-[#442a21] w-full "
            />
            {error && <div className="error">{error}</div>}
            <button
              type="submit"
              className="bg-emerald-600 text-white font-bold py-2.5 px-4 w-20 rounded ss:px-4 ml-4 "
            >
              追加
            </button>
          </div>
        </form>
    </div>
  );
};

export default TodoForm;