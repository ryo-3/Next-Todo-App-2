import React, { useEffect, useRef } from "react";

interface FooterTodoFormProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
}

const FooterTodoForm: React.FC<FooterTodoFormProps> = ({
  inputValue,
  handleChange,
  handleSubmit,
  error
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();  // フォームが表示されたとき、または続けて新しい入力を行うためにフォーカスを設定
    }
  }, [inputValue]); // inputValue が変更されるたびにフォーカスを設定

  return (
    <form onSubmit={handleSubmit} className="flex justify-between items-center p-4">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="タスクを入力..."
        className="flex-1 mr-2 p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        追加
      </button>
    </form>
  );
};

export default FooterTodoForm;
