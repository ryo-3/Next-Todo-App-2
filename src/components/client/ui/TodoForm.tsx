import React, { CSSProperties, useEffect } from "react";
import useScrollFixed from "../../../不要ファイル/useScrollFixed";

interface TodoFormProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  showForm: boolean;
  style?: CSSProperties; // Optionalでstyleプロパティを追加
}

const TodoForm: React.FC<TodoFormProps> = ({
  inputValue,
  handleChange,
  handleSubmit,
  error,
  showForm,
  inputRef,
  style,
}) => {
  const { placeholderStyle, fixedStyle, formRef } = useScrollFixed();
  const handleSubmitWithFocus: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    handleSubmit(event);
    inputRef.current?.focus();
  };

  return (
    <div ref={formRef} style={placeholderStyle}>
      <form
        onSubmit={handleSubmitWithFocus}
        className="w-full z-10"
        style={fixedStyle}
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="入力欄 ..."
            className="border-2 py-2 pl-3 rounded focus:outline-none focus:border-yellow-950 w-full"
          />
          {error && (
            <img
              src={error}
              alt="Error"
              className="absolute left-20 top-5 transform -translate-y-1/2 h-4 w-4"
            />
          )}
          <button
            type="submit"
            className="bg-emerald-600 text-white font-bold py-2.5 px-4 w-20 rounded ss:px-4 ml-4"
          >
            追加
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
