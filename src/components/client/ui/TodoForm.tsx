import React, { CSSProperties, useEffect } from "react";
import useScrollFixed from "../hooks/useHeadrScrollFixed";

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

//   useEffect(() => {
//     if (showForm && inputRef.current) {
//       inputRef.current?.focus();
//     }
//   }, [showForm, inputRef]);

  return (
    <div ref={formRef} style={placeholderStyle}>
      <form
        onSubmit={handleSubmitWithFocus}
        className="relative flex justify-between smd:justify-start w-full"
        style={fixedStyle}
      >
        <input
        ref={inputRef}
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
    </div>
  );
};

export default TodoForm;
