import React from "react";
import Image from "next/image";

interface TodoFormProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  showForm: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  fixedStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
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
  placeholderStyle,
}) => {
  const handleSubmitWithFocus: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    handleSubmit(event);
    inputRef.current?.focus();
  };

  return (
    <div ref={formRef} style={placeholderStyle}>
      <form onSubmit={handleSubmitWithFocus} style={fixedStyle} className="">
        <div className="relative flex items-center ">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="入力欄 ..."
            className="border-2 py-2 pl-3 rounded focus:outline-none focus:border-[#442a21] w-full "
          />
          {error && (
            <div className="error">
              <Image
                src="/seedling.png"
                alt="Error Icon"
                width={18}
                height={18}
                priority
              />
              <span>{error}</span>
            </div>
          )}
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
