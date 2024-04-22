import { useState, useEffect } from "react";

function useInputValidation(
  validator: (value: string) => boolean,
  inputValue: string
) {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // 入力値が変更された場合にエラーをクリア
    if (inputValue.trim().length > 0) {
      setError("");
    }
  }, [inputValue]);

  const validateInput = (): boolean => {
    const isValid = validator(inputValue);
    setError(isValid ? "" : "!");
    return isValid;
  };

  return { validateInput, error };
}

export default useInputValidation;