import { useState } from "react";

function useInputValidation(
  validator: (value: string) => boolean,
  inputValue: string
) {
  const [error, setError] = useState<string>("");

  const validateInput = (): boolean => {
    const isValid = validator(inputValue);
    setError(isValid ? "" : "Invalid input");
    return isValid;
  };

  return { validateInput, error };
}

export default useInputValidation;
