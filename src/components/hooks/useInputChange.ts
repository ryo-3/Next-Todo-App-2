import { useState } from "react";

function useInputChange(initialValue = "") {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return { inputValue, handleChange };
}

export default useInputChange;
