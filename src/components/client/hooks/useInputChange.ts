// 入力値の状態の管理　変更されたときに反映する
"use client";
import { useState } from "react";

function useInputChange(initialValue = "") {
  const [inputValue, setInputValue] = useState<string>("");

  // inputValue を更新するイベントハンドラ
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value); // 入力された値で inputValue を更新
  };

  // inputValue とその更新関数、そして handleChange イベントハンドラを返す
  return {
    inputValue,
    setInputValue,
    handleChange,
  };
}

export default useInputChange;
