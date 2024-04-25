"use client";
import React, { useEffect, useRef, useState } from "react";
import useTodoManagement from "@/components/client/hooks/useTodoManagement";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import UndoListButton from "@/components/client/ui/UndoListButton.client";
import { TodoProvider } from "@/components/client/context/TodoContext";

const Page = () => {
  const {
    inputValue,
    handleChange,
    todos,
    setTodos,
    handleSubmit,
    error,
    handleSelect,
    selectedId,
    toggleTodoComplete,
    loading,
    removeItem,
  } = useTodoManagement();

  const [isFixed, setIsFixed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null); // フォーム要素への参照
  const lastScrollY = useRef(0); // 最後のスクロール位置を記憶するためのref
  const [formHeight, setFormHeight] = useState(0);
  

  useEffect(() => {
    // 初回レンダリング時にフォームの高さと位置を設定
    const initialFormHeight = formRef.current
      ? formRef.current.offsetHeight
      : 0;
    const initialFormTop = formRef.current ? formRef.current.offsetTop : 0;

    setFormHeight(initialFormHeight);

    const handleScroll = () => {

      // スクロールが上に移動しているかどうかを判定
      const scrollingUp = window.scrollY < lastScrollY.current;

      if (window.scrollY >= -15 + initialFormTop && !scrollingUp) {
        setIsFixed(true); // スクロール位置がフォームの上端以上で、かつ下にスクロールしている場合はfixedを適用
      } else if (scrollingUp && window.scrollY <= initialFormTop - 15) {
        setIsFixed(false); // 上にスクロールしていて、かつスクロール位置がヘッダーの高さ以下になった場合はfixedを解除
      }

      // 現在のスクロール位置を記録
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 依存配列が空なので、コンポーネントマウント時に1度だけ設定されます

  // プレースホルダー要素の高さを動的に調整
  const placeholderStyle = isFixed ? { height: `${formHeight}px` } : {};
  const fixedStyle: React.CSSProperties = isFixed
    ? {
        position: "fixed", // 明示的にCSSのPosition値を指定
        top: `15px`, // CSSの値は文字列でなければならない
        width: formRef.current?.offsetWidth + "px", // offsetWidthを用いて幅を保持
      }
    : {};

  return (
    <TodoProvider>
      <main>
        <div style={placeholderStyle} /> {/* プレースホルダー要素 */}
        <div ref={formRef} style={fixedStyle}>
          <form
            onSubmit={handleSubmit}
            className="relative flex justify-between smd:justify-start w-full"
          >
            <input
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
        {loading ? (
          <div className="text-stone-500">リスト読み込み中...</div>
        ) : (
          <ul className="pb-20 pt-5">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`Todolist flex justify-between items-center ${
                  selectedId === todo.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(todo.id)}
              >
                <span className="listItem">{todo.text}</span>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 w-6 mr-3"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                    className="align-middle h-7 w-7 accent-green-900"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        <ClearListButton
          todos={todos}
          setTodos={setTodos}
          isTodoCompleted={todos.some((todo) => todo.completed)}
        />
        <UndoListButton
          todos={todos}
          setTodos={setTodos}
          removeItem={removeItem}
        />
      </main>
    </TodoProvider>
  );
};

export default Page;
