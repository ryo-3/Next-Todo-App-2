// 入力値の状態の管理　変更されたときに反映する
"use client";
import { useState } from "react";

function useInputChange(initialValue = "") {
  // useState を使用して inputValue 状態を初期化します。
  // initialValue パラメータにデフォルト値の空文字列を設定しています。
  // 型パラメータ <string> で inputValue の型を明示的に string に指定しています。
  const [inputValue, setInputValue] = useState<string>(initialValue);

  // inputValue を更新するイベントハンドラを定義しています。
  // event.target.value から入力された値を取得し、setInputValue で inputValue を更新しています。
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  // inputValue、setInputValue、handleChange を返すことで、
  // 呼び出し側でこれらの値とイベントハンドラにアクセスできるようにしています。
  return {
    inputValue,
    setInputValue,
    handleChange,
  };
}

export default useInputChange;

// 入力値の状態管理が簡単になります。
// 入力値が変更されたときに、その変更を即座に反映できます。
// 呼び出し側で柔軟に初期値を指定できます。
// 型安全性が高く、TypeScript での使用に適しています。