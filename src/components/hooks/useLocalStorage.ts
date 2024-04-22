// useLocalStorage ローカルストレージに保存する機能

import { useState, useEffect } from "react";

// useLocalStorage というジェネリック関数を定義。
// この関数は、TypeScriptのジェネリック型 T を使用して、任意の型のデータを扱うことができます。
// 引数には key（ローカルストレージのキー）と initialValue（初期値）を取り、状態値とその状態を更新する関数のタプルを返します。
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // クライアントサイドでのみ実行するための状態フラグ
  const [isClient, setIsClient] = useState(false);

  // この useEffect はコンポーネントがマウントされた後に一度だけ実行され、isClient を true に設定します。
  // これにより、コードがクライアントサイドで実行されているかどうかを確認できます。
  useEffect(() => {
    setIsClient(true);
  }, []);

  // storedValue という状態を initialValue で初期化しています。
  // この状態はローカルストレージから読み込まれた値、または与えられた初期値で保持されます。
  const [storedValue, setStoredValue] = useState<T>(initialValue); // 初期値を設定

  // この useEffect は、isClient または key が変更されたときに実行されます。クライアントサイドで実行されている場合、
  // ローカルストレージから指定されたキーの値を読み込み、存在する場合は JSON でパースして storedValue を更新します。
  useEffect(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [isClient, key]);

  // この useEffect は storedValue、key、または isClient が変更されたときに実行されます。
  // クライアントサイドで実行されている場合、storedValue の現在値を JSON 文字列に変換してローカルストレージに保存します。
  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.log(error);
      }
    }
  }, [storedValue, key, isClient]);

  // この関数は、最終的に storedValue とその値を更新する関数 setStoredValue をタプルとして返します。
  // これにより、他のコンポーネントでこのフックを使用するときに状態値を取得し、更新することができます。
  return [storedValue, setStoredValue];
}
// このカスタムフックをデフォルトでエクスポートしています。これにより、他のファイルからこのフックをインポートして使用することが可能です。
export default useLocalStorage;
