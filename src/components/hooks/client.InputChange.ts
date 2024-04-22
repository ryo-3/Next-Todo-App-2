// useInputChange.ts
import { useState } from "react";

function useInputChange(initialValue = "") {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const { validateInput, error, setError } = useInputValidation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setInputValue(newValue); // 入力値を更新

    // 新しい入力値でバリデーションを実行し、必要に応じてエラーメッセージを設定
    validateInput(newValue);
  };

  return { inputValue, handleChange, error };
}

export default useInputChange;
