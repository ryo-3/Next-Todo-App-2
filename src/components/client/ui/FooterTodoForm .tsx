import React, { useEffect, useRef, FormEvent } from "react";

interface FooterTodoFormProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  showForm: boolean;
}

const FooterTodoForm: React.FC<FooterTodoFormProps> = ({
  inputValue,
  handleChange,
  handleSubmit,
  error,
  inputRef,
  showForm,
}) => {
  const handleSubmitWithFocus: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    handleSubmit(event);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (showForm) {
      inputRef.current?.focus();
    }
  }, [showForm]);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmitWithFocus}
        className="fixed top-14 z-10 flex justify-between smd:justify-start w-90"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="タスクを入力..."
          className="border-2 py-2 pl-3 rounded mr-2 w-9/12 focus:outline-none focus:border-yellow-950"
        />
        {error && <p className="text-red-500">{error}</p>}
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

export default FooterTodoForm;
